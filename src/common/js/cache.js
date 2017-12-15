import storage from 'good-storage'
const TOKEN_KEY = '__token__'

export function saveToken (token) {
  return storage.set(TOKEN_KEY, token)
}

export function loadToken () {
  return storage.get(TOKEN_KEY, '')
}
