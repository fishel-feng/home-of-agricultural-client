import * as types from './mutations-types'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_COLLECTIONS] (state, collections) {
    state.token = collections
  },
  [types.SET_ATTENTIONS] (state, attentions) {
    state.token = attentions
  },
  [types.SET_FOLLOWINGS] (state, followings) {
    state.token = followings
  }
}

export default mutations
