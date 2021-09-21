import { get, post, put, _delete } from 'lin/plugins/axios'

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

  async deleteContent(id, type) {
    const res = await _delete(`v1/content/${id}`, { type })
    return res
  }
}

export default new Content()
