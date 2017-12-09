import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'
import Wiki from '@/components/Wiki'
import Question from '@/components/Question'
import Circles from '@/components/Circles'
import Me from '@/components/Me'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
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
})
