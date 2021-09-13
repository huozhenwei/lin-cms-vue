<template>
  <div class="container">
    <div class="title">期刊内容列表</div>
    <div class="add-button">
      <el-button type="primary">新增内容</el-button>
    </div>
    <div class="table-container">
      <el-table :data="contentList"></el-table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ContentModel from '@/models/content'

export default {
  name: 'contentList',
  data() {
    return {
      contentList: [],
    }
  },
  created() {
    this.getContentList()
  },
  methods: {
    async getContentList() {
      this.contentList = await ContentModel.getContentList()
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
