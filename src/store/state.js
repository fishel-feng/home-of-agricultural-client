import {loadToken} from '@/common/js/cache'

const state = {
  token: loadToken(),
  collections: []
}

export default state
