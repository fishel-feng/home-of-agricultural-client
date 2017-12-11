import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = (resolve) => {
  import('@/views/index').then((module) => {
    resolve(module)
  })
}

const News = (resolve) => {
  import('@/components/News').then((module) => {
    resolve(module)
  })
}

const Wiki = (resolve) => {
  import('@/components/Wiki').then((module) => {
    resolve(module)
  })
}

const Question = (resolve) => {
  import('@/components/Question').then((module) => {
    resolve(module)
  })
}

const Circles = (resolve) => {
  import('@/components/Circles').then((module) => {
    resolve(module)
  })
}

const Me = (resolve) => {
  import('@/components/Me').then((module) => {
    resolve(module)
  })
}

// const ArticleList = (resolve) => {
//   import('@/components/ArticleList').then((module) => {
//     resolve(module)
//   })
// }

// const ArticleInfo = (resolve) => {
//   import('@/components/ArticleInfo').then((module) => {
//     resolve(module)
//   })
// }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/news',
          name: 'News',
          component: News
        },
        {
          path: '/wiki',
          name: 'Wiki',
          component: Wiki
        },
        {
          path: '/question',
          name: 'Question',
          component: Question
        },
        {
          path: '/circles',
          name: 'Circles',
          component: Circles
        },
        {
          path: '/me',
          name: 'Me',
          component: Me
        }
      ]
    }
  ]
})
