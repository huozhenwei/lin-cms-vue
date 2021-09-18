import { get, post } from 'lin/plugins/axios'

class Content {
  async getContentList() {
    const list = await get('v1/content')
    return list
  }

  async addContent(data) {
    const res = await post('v1/content', { ...data })
    return res
  }
}

export default new Content()
