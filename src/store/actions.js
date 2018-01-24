import * as types from './mutations-types'
import { saveToken, saveMyId } from '@/common/js/cache'

export const addToken = function ({commit}, token) {
  commit(types.SET_TOKEN, saveToken(token))
}

export const addMyId = function ({commit}, myId) {
  commit(types.SET_MY_ID, saveMyId(myId))
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

export const addLike = function ({commit, state}, circleId) {
  let likes = state.likes.slice()
  likes.push(circleId)
  commit(types.SET_LIKES, likes)
}

export const deleteLike = function ({commit, state}, circleId) {
  let likes = state.likes.slice()
  let index = likes.indexOf(circleId)
  likes.splice(index, 1)
  commit(types.SET_LIKES, likes)
}

export const saveUserInfo = function ({commit}, userInfo) {
  commit(types.SET_COLLECTIONS, userInfo.collections)
  // commit(types.SET_CIRCLES, userInfo.circles)
  // commit(types.SET_QUESTIONS, userInfo.questions)
  commit(types.SET_ATTENTIONS, userInfo.attentions)
  commit(types.SET_ANSWERS, userInfo.answers)
  commit(types.SET_FOLLOWINGS, userInfo.followings)
  commit(types.SET_FOLLOWERS, userInfo.followers)
  commit(types.SET_LIKES, userInfo.likes)
  commit(types.SET_MY_ID, userInfo._id)
}
