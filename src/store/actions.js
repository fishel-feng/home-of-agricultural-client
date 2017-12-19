import * as types from './mutations-types'
import { saveToken } from '@/common/js/cache'

export const addToken = function ({commit}, token) {
  commit(types.SET_TOKEN, saveToken(token))
}

export const addCollection = function ({commit, state}, article) {
  let collections = state.collections.slice()
  collections.push(article)
  commit(types.SET_COLLECTIONS, collections)
}

export const deleteCollection = function ({commit, state}, articleId) {
  let collections = state.collections.slice()
  let index = collections.findIndex(item => {
    return item.articleId === articleId
  })
  collections.splice(index, 1)
  commit(types.SET_COLLECTIONS, collections)
}

export const saveUserInfo = function ({commit}, userInfo) {
  console.log(userInfo)
  commit(types.SET_COLLECTIONS, userInfo.collections)
  commit(types.SET_CIRCLES, userInfo.circles)
  commit(types.SET_QUESTIONS, userInfo.questions)
  commit(types.SET_ATTENTIONS, userInfo.attentions)
  commit(types.SET_ANSWERS, userInfo.answers)
  commit(types.SET_FOLLOWINGS, userInfo.followings)
  commit(types.SET_FOLLOWERS, userInfo.followers)
}
