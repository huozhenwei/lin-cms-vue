import { get, post, put } from 'lin/plugins/axios'

class Content {
  async getContentList() {
    const list = await get('v1/content')
    return list
  }

  async addContent(data) {
    const res = await post('v1/content', { ...data })
    return res
  }

  async editContent(id, data) {
    const res = await put(`v1/content/${id}`, { ...data })
    return res
  }
}

export default new Content()
