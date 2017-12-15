import * as types from './mutations-types'
import { saveToken } from '@/common/js/cache'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    saveToken(token)
    state.token = token
  }
}

export default mutations
