import * as types from './mutations-types'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_COLLECTIONS] (state, collections) {
    state.collections = collections
  },
  [types.SET_CIRCLES] (state, circles) {
    state.circles = circles
  },
  [types.SET_QUESTIONS] (state, questions) {
    state.questions = questions
  },
  [types.SET_ATTENTIONS] (state, attentions) {
    state.attentions = attentions
  },
  [types.SET_ANSWERS] (state, answers) {
    state.answers = answers
  },
  [types.SET_FOLLOWINGS] (state, followings) {
    state.followings = followings
  },
  [types.SET_FOLLOWERS] (state, followers) {
    state.followers = followers
  }
}

export default mutations
