import {loadToken, loadMyId} from '@/common/js/cache'

const state = {
  token: loadToken(),
  collections: [],
  circles: [],
  questions: [],
  attentions: [],
  answers: [],
  followings: [],
  followers: [],
  likes: [],
  myId: loadMyId(),
  tags: [
    {_id: '5a3e19eb2b25bae314e7fbc5', tagName: '黄瓜'},
    {_id: '5a3e1a062b25bae314e7fbd4', tagName: '水稻'},
    {_id: '5a3e1a122b25bae314e7fbdc', tagName: '葡萄'},
    {_id: '5a3e1a1e2b25bae314e7fbe3', tagName: '苹果'},
    {_id: '5a3e20f92b25bae314e7fe11', tagName: '玉米'}
  ]
}

export default state
