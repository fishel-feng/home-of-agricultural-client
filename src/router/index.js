import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const News = (resolve) => {
  import('@/components/news').then((module) => {
    resolve(module)
  })
}

const Wiki = (resolve) => {
  import('@/components/wiki').then((module) => {
    resolve(module)
  })
}

const Question = (resolve) => {
  import('@/components/question').then((module) => {
    resolve(module)
  })
}

const Circles = (resolve) => {
  import('@/components/circles').then((module) => {
    resolve(module)
  })
}

const Me = (resolve) => {
  import('@/components/me').then((module) => {
    resolve(module)
  })
}

const ArticleList = (resolve) => {
  import('@/components/article-list').then((module) => {
    resolve(module)
  })
}

const ArticleInfo = (resolve) => {
  import('@/components/article-info').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      component: News,
      children: [
        {
          path: ':listId',
          component: ArticleList,
          children: [
            {
              path: ':articleId',
              component: ArticleInfo
            }
          ]
        }
      ]
    },
    {
      path: '/wiki',
      component: Wiki
    },
    {
      path: '/question',
      component: Question
    },
    {
      path: '/circles',
      component: Circles
    },
    {
      path: '/me',
      component: Me
    }
  ]
})
