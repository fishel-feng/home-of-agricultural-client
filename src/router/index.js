import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const News = (resolve) => {
  import('@/components/pages/news/news').then((module) => {
    resolve(module)
  })
}

const ArticleInfo = (resolve) => {
  import('@/components/pages/news/article-info').then((module) => {
    resolve(module)
  })
}

const Wiki = (resolve) => {
  import('@/components/pages/wiki/wiki').then((module) => {
    resolve(module)
  })
}

const Question = (resolve) => {
  import('@/components/pages/question/question').then((module) => {
    resolve(module)
  })
}

const QuestionInfo = (resolve) => {
  import('@/components/pages/question/question-info').then((module) => {
    resolve(module)
  })
}

const QuestionAdd = (resolve) => {
  import('@/components/pages/question/question-add').then((module) => {
    resolve(module)
  })
}

const AnswerAdd = (resolve) => {
  import('@/components/pages/question/answer-add').then((module) => {
    resolve(module)
  })
}

const SelectItem = (resolve) => {
  import('@/components/pages/question/select-item').then((module) => {
    resolve(module)
  })
}

const ExpertList = (resolve) => {
  import('@/components/pages/question/expert-list').then((module) => {
    resolve(module)
  })
}

const Chat = (resolve) => {
  import('@/components/pages/question/chat').then((module) => {
    resolve(module)
  })
}

const Circles = (resolve) => {
  import('@/components/pages/circles/circles').then((module) => {
    resolve(module)
  })
}

const CircleAdd = (resolve) => {
  import('@/components/pages/circles/circle-add').then((module) => {
    resolve(module)
  })
}

const CommentList = (resolve) => {
  import('@/components/pages/circles/comment-list').then((module) => {
    resolve(module)
  })
}

const CommentAdd = (resolve) => {
  import('@/components/pages/circles/comment-add').then((module) => {
    resolve(module)
  })
}

const LikeList = (resolve) => {
  import('@/components/pages/circles/like-list').then((module) => {
    resolve(module)
  })
}

const User = (resolve) => {
  import('@/components/pages/user/user').then((module) => {
    resolve(module)
  })
}

const UserCard = (resolve) => {
  import('@/components/pages/user/user-card').then((module) => {
    resolve(module)
  })
}

const UserCollection = (resolve) => {
  import('@/components/pages/user/user-collection').then((module) => {
    resolve(module)
  })
}

const UserCircle = (resolve) => {
  import('@/components/pages/user/user-circle').then((module) => {
    resolve(module)
  })
}

const UserQuestion = (resolve) => {
  import('@/components/pages/user/user-question').then((module) => {
    resolve(module)
  })
}

const UserAttention = (resolve) => {
  import('@/components/pages/user/user-attention').then((module) => {
    resolve(module)
  })
}

const UserAnswer = (resolve) => {
  import('@/components/pages/user/user-answer').then((module) => {
    resolve(module)
  })
}

const FollowingList = (resolve) => {
  import('@/components/pages/user/following-list').then((module) => {
    resolve(module)
  })
}

const FollowerList = (resolve) => {
  import('@/components/pages/user/follower-list').then((module) => {
    resolve(module)
  })
}

const SignIn = (resolve) => {
  import('@/components/pages/user/sign-in').then((module) => {
    resolve(module)
  })
}

const UserForm = (resolve) => {
  import('@/components/pages/user/user-form').then((module) => {
    resolve(module)
  })
}

const About = (resolve) => {
  import('@/components/pages/user/about').then((module) => {
    resolve(module)
  })
}

const Recent = (resolve) => {
  import('@/components/pages/user/recent').then((module) => {
    resolve(module)
  })
}

const Certification = (resolve) => {
  import('@/components/pages/user/certification').then((module) => {
    resolve(module)
  })
}

const MessageCenter = (resolve) => {
  import('@/components/pages/user/message-center').then((module) => {
    resolve(module)
  })
}

const UserEdit = (resolve) => {
  import('@/components/pages/user/user-edit').then((module) => {
    resolve(module)
  })
}

const CircleFragment = [
  {
    path: 'userCard',
    component: UserCard
  },
  {
    path: 'like',
    component: LikeList
  },
  {
    path: 'addComment',
    component: CommentAdd
  },
  {
    path: 'comment',
    component: CommentList,
    children: [
      {
        path: 'replyComment',
        component: CommentAdd
      },
      {
        path: 'userCard',
        component: UserCard
      }
    ]
  }
]

const QuestionFragment = [
  {
    path: ':questionId',
    component: QuestionInfo,
    children: [
      {
        path: 'addAnswer',
        component: AnswerAdd
      },
      {
        path: 'expert',
        component: ExpertList,
        children: [
          {
            path: 'userCard',
            component: UserCard
          }
        ]
      },
      {
        path: 'chat',
        component: Chat
      }
    ]
  }
]

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
          path: ':articleId',
          component: ArticleInfo
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
        ...QuestionFragment,
        {
          path: 'selectItem',
          component: SelectItem
        },
        {
          path: 'addQuestion',
          component: QuestionAdd
        }
      ]
    },
    {
      path: '/circles',
      component: Circles,
      children: [
        ...CircleFragment,
        {
          path: 'addCircle',
          component: CircleAdd
        }
      ]
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'userCard',
          component: UserCard
        },
        {
          path: 'edit',
          component: UserEdit
        },
        {
          path: 'collections',
          component: UserCollection,
          children: [
            {
              path: ':articleId',
              component: ArticleInfo
            }
          ]
        },
        {
          path: 'circles',
          component: UserCircle,
          children: CircleFragment
        },
        {
          path: 'questions',
          component: UserQuestion,
          children: QuestionFragment
        },
        {
          path: 'attentions',
          component: UserAttention,
          children: QuestionFragment
        },
        {
          path: 'answers',
          component: UserAnswer,
          children: QuestionFragment
        },
        {
          path: 'followings',
          component: FollowingList
        },
        {
          path: 'followers',
          component: FollowerList
        },
        {
          path: 'about',
          component: About
        },
        {
          path: 'certification',
          component: Certification
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
      path: '/message',
      component: MessageCenter
    },
    {
      path: '/chat',
      component: Chat
    },
    {
      path: '/recent',
      component: Recent
    }
  ]
})
