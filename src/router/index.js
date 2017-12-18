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

const QuestionList = (resolve) => {
  import('@/components/question-list').then((module) => {
    resolve(module)
  })
}

const QuestionInfo = (resolve) => {
  import('@/components/question-info').then((module) => {
    resolve(module)
  })
}

const QuestionAdd = (resolve) => {
  import('@/components/question-add').then((module) => {
    resolve(module)
  })
}

const SelectItem = (resolve) => {
  import('@/components/select-item').then((module) => {
    resolve(module)
  })
}

const Circles = (resolve) => {
  import('@/components/circles').then((module) => {
    resolve(module)
  })
}

const User = (resolve) => {
  import('@/components/user').then((module) => {
    resolve(module)
  })
}

const UserCard = (resolve) => {
  import('@/components/user-card').then((module) => {
    resolve(module)
  })
}

const FollowingList = (resolve) => {
  import('@/components/following-list').then((module) => {
    resolve(module)
  })
}

const FollowerList = (resolve) => {
  import('@/components/follower-list').then((module) => {
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

const CircleList = (resolve) => {
  import('@/components/circle-list').then((module) => {
    resolve(module)
  })
}

const CircleAdd = (resolve) => {
  import('@/components/circle-add').then((module) => {
    resolve(module)
  })
}

const CommentList = (resolve) => {
  import('@/components/comment-list').then((module) => {
    resolve(module)
  })
}

const CommentAdd = (resolve) => {
  import('@/components/comment-add').then((module) => {
    resolve(module)
  })
}

const LikeList = (resolve) => {
  import('@/components/like-list').then((module) => {
    resolve(module)
  })
}

const SignIn = (resolve) => {
  import('@/components/sign-in').then((module) => {
    resolve(module)
  })
}

const UserForm = (resolve) => {
  import('@/components/user-form').then((module) => {
    resolve(module)
  })
}

const About = (resolve) => {
  import('@/components/about').then((module) => {
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
      component: Question,
      children: [
        {
          path: 'selectItem',
          component: SelectItem
        },
        {
          path: ':tag',
          component: QuestionList,
          children: [
            {
              path: ':questionId',
              component: QuestionInfo
            }
          ]
        }
      ]
    },
    {
      path: '/circles',
      component: Circles,
      children: [
        {
          path: 'comment',
          component: CircleList,
          children: [
            {
              path: ':circleId',
              component: CommentList
            }
          ]
        },
        {
          path: 'like',
          component: CircleList,
          children: [
            {
              path: ':circleId',
              component: LikeList
            }
          ]
        },
        {
          path: ':type',
          component: CircleList
        }
      ]
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'collections'
          // todo
        },
        {
          path: 'following',
          component: FollowingList
        },
        {
          path: 'follower',
          component: FollowerList
        },
        {
          path: ':id',
          component: UserCard
        }
      ]
    },
    {
      path: '/signIn',
      component: SignIn
    },
    {
      path: '/signUp',
      component: UserForm
    },
    {
      path: '/resetPassword',
      component: UserForm
    },
    {
      path: '/addCircle',
      component: CircleAdd
    },
    {
      path: '/addQuestion',
      component: QuestionAdd
    },
    {
      path: '/addComment',
      component: CommentAdd
    },
    {
      path: '/about',
      component: About
    }
  ]
})
