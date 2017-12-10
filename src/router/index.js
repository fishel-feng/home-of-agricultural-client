import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'
import Wiki from '@/components/Wiki'
// import Question from '@/components/Question'
// import Circles from '@/components/Circles'
// import Me from '@/components/Me'
import ArticleInfo from '@/components/ArticleInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'News',
      component: News
    },
    {
      path: '/wiki',
      name: 'Wiki',
      component: Wiki
    },
    {
      path: '/articleInfo/:id',
      name: 'ArticleInfo',
      component: ArticleInfo
    }
  ]
})
