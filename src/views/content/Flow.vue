<template>
  <div class="container">
    <div class="title">最新期刊</div>
    <div class="add-button">
      <el-button type="primary" @click="handleAdd" v-permission="'新增最细期刊'">添加期刊</el-button>
    </div>
    <!-- 列表 -->
    <div class="table-container">
      <el-table :data="tableData" border highlight-current-row :cell-style="{'text-align': 'center'}">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column label="内容标题" prop="detail.title"></el-table-column>
        <el-table-column label="内容类型" prop="type">
          <template slot-scope="scope">
            {{ type[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column label="内容介绍" prop="detail.content"></el-table-column>
        <el-table-column label="排序" prop="index"></el-table-column>
        <el-table-column label="是否展示">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="success">展示中</el-tag>
            <el-tag v-else type="info">未展示</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" v-permission="'编辑最新期刊列表'">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)" v-permission="'删除最新期刊列表内容'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 增加和编辑框 -->
      <el-dialog
          :title="dialogTitle"
          width="800px"
          :visible.sync="showDialog"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          @close="resetForm"
      >
        <el-form ref="form" :model="temp" label-width="90px" :rules="rules">
          <el-form-item label="排序" prop="index">
            <el-input-number v-model="temp.index" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="期刊内容" prop="art">
            <el-cascader v-model="temp.art" :options="options"></el-cascader>
          </el-form-item>
          <el-form-item label="是否展示" prop="status">
            <el-switch v-model="temp.status" :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="dialogTitle === '新增期刊' ? confirmAdd() : confirmEdit()">保 存</el-button>
      </span>
      </el-dialog>

      <!-- 删除确认框 -->
      <el-dialog title="提示" :visible.sync="showDeleteDialog" width="400px">
        <span>确认删除期刊吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showDeleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="confirmDelete">删除</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import FlowModel from '@/models/flow'
import ContentModel from '@/models/content'

export default {
  name: 'Flow',
  data() {
    return {
      tableData: [],
      type: {
        100: '电影',
        200: '音乐',
        300: '句子',
      },
      dialogTitle: '',
      showDialog: false,
      temp: {
        // 对应数据表字段
        art: [],
        index: 1,
        status: 0,
      },
      rules: {
        art: [{
          required: true,
          message: '期刊内容不能为空',
          trigger: 'blur',
        }],
      },
      options: [],
      id: '',
      showDeleteDialog: false,
    }
  },
  created() {
    this.getFlowList()
  },
  methods: {
    async getFlowList() {
      this.tableData = await FlowModel.getFlowList()
    },
    handleAdd() {
      this.showDialog = true
      this.dialogTitle = '新增期刊'
      this.getContentOptions()
    },
    async confirmAdd() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const p = {
            index: this.temp.index,
            type: this.temp.art[0],
            art_id: this.temp.art[1],
            status: this.temp.status,
          }
          const res = await FlowModel.addFlow(p)
          this.showDialog = false
          this.$message.success(res.message)
          await this.getFlowList()
        }
      })
    },
    handleEdit(row) {
      this.id = row.id
      this.temp.index = row.index
      this.temp.art = [row.detail.type, row.detail.id]
      this.temp.status = row.status

      this.dialogTitle = '编辑期刊'
      this.showDialog = true

      this.getContentOptions()
    },
    async confirmEdit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const p = {
            index: this.temp.index,
            type: this.temp.art[0],
            art_id: this.temp.art[1],
            status: this.temp.status,
          }
          const res = await FlowModel.editFow(this.id, p)
          this.showDialog = false
          this.$message.success(res.message)
          await this.getFlowList()
        }
      })
    },
    handleDelete(_id) {
      this.showDeleteDialog = true
      this.id = _id
    },
    async confirmDelete() {
      this.showDeleteDialog = false
      const res = await FlowModel.deleteFlow(this.id)
      this.$message.success(res.message)
      await this.getFlowList()
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    async getContentOptions() {
      // 获取所有的期刊内容
      const contentList = await ContentModel.getContentList()
      this.options = this._generateOptionsData(contentList)
    },
    _generateOptionsData(data) {
      // // 格式化数据，用于级联控件
      // const res = [
      //   {
      //     value: 'movie',
      //     label: '电影',
      //     children: [],
      //   },
      //   {
      //     value: 'music',
      //     label: '音乐',
      //     children: [],
      //   },
      //   {
      //     value: 'sentence',
      //     label: '句子',
      //     children: [],
      //   },
      // ]
      // for (let i = 0; i < data.length; i++) {
      //   const temp = data[i]
      //   if (temp.type === 100) {
      //     res[0].children.push({
      //       value: temp.id,
      //       label: temp.title,
      //     })
      //   } else if (temp.type === 200) {
      //     res[1].children.push({
      //       value: temp.id,
      //       label: temp.title,
      //     })
      //   } else if (temp.type === 300) {
      //     res[2].children.push({
      //       value: temp.id,
      //       label: temp.title,
      //     })
      //   }
      // }
      // return res

      // 筛选出分类
      let types = []
      data.forEach(d => types.push(d.type))
      // 去重
      types = Array.from(new Set(types))
      // 构建一级分类选项
      const options = types.map(t => ({
        value: t,
        label: this.type[t],
        children: [],
      }))
      // 添加二级数据
      options.forEach((o, index) => {
        const children = []
        data.forEach(child => {
          if (child.type === o.value) {
            children.push({
              value: child.id,
              label: child.title,
              disabled: !child.status,
            })
          }
        })
        options[index].children = children
      })
      return options
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .add-button {
    padding: 20px 40px;
  }

  .table-container {
    padding: 0 40px 20px 40px;
  }
}
</style>
