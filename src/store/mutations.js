import * as types from './mutations-types'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_COLLECTIONS] (state, collections) {
    state.collections = collections
  },
  [types.SET_ATTENTIONS] (state, attentions) {
    state.attentions = attentions
  },
  [types.SET_FOLLOWINGS] (state, followings) {
    state.followings = followings
  }
}

export default mutations
