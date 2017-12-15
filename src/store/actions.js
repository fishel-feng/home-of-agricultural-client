import * as types from './mutations-types'
import { saveToken } from '@/common/js/cache'

export const addToken = function ({commit}, token) {
  commit(types.SET_TOKEN, saveToken(token))
}

export const saveCollections = function ({commit}, collections) {
  commit(types.SET_COLLECTIONS, collections)
}

export const saveAttentions = function ({commit}, attentions) {
  commit(types.SET_COLLECTIONS, attentions)
}

export const saveFollowings = function ({commit}, followings) {
  commit(types.SET_COLLECTIONS, followings)
}
