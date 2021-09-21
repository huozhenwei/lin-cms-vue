import { get } from 'lin/plugins/axios'

class Flow {
  async getFlowList() {
    const res = await get('/v1/flow')
    return res
  }
}

export default new Flow()
