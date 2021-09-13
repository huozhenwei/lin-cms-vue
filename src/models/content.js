import { get } from 'lin/plugins/axios'

class Content {
  async getContentList() {
    const list = await get('v1/content')
    return list
  }
}

export default new Content()
