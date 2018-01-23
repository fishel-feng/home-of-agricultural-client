import storage from 'good-storage'
const TOKEN_KEY = '__token__'
const ID_KEY = '__id__'

export function saveToken (token) {
  return storage.set(TOKEN_KEY, token)
}

export function loadToken () {
  return storage.get(TOKEN_KEY, '')
}

export function saveMyId (myId) {
  return storage.set(ID_KEY, myId)
}

export function loadMyId () {
  return storage.get(ID_KEY, '')
}
