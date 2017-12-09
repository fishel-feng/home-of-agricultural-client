import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'
import Wiki from '@/components/Wiki'
import Question from '@/components/Question'
import Circle from '@/components/Circle'
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
      path: '/circle',
      name: 'Circle',
      component: Circle
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
  ]
})
