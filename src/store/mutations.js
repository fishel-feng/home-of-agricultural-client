import * as types from './mutations-types'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  }
}

export default mutations
