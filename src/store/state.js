import {loadToken} from '@/common/js/cache'

const state = {
  token: loadToken(),
  collections: [],
  circles: [],
  questions: [],
  attentions: [],
  answers: [],
  followings: [],
  followers: []
}

export default state
