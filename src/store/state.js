import {loadToken} from '@/common/js/cache'

const state = {
  token: loadToken(),
  collections: [],
  attentions: [],
  followings: []
}

export default state
