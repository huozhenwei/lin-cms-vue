import { _delete, get, post, put } from 'lin/plugins/axios'

class Flow {
  async getFlowList() {
    const res = await get('/v1/flow')
    return res
  }

  async addFlow(data) {
    const res = await post('/v1/flow', { ...data })
    return res
  }

  async editFow(id, data) {
    const res = await put(`/v1/flow/${id}`, { ...data })
    return res
  }

  async deleteFlow(id) {
    const res = await _delete(`v1/flow/${id}`)
    return res
  }
}

export default new Flow()
