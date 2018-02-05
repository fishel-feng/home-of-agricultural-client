import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const News = (resolve) => {
  import('@/components/pages/news/news').then((module) => {
    resolve(module)
  })
}

const ArticleList = (resolve) => {
  import('@/components/pages/news/article-list').then((module) => {
    resolve(module)
  })
}

const ArticleInfo = (resolve) => {
  import('@/components/pages/news/article-info').then((module) => {
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

const QuestionType = (resolve) => {
  import('@/components/question-type').then((module) => {
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

const AnswerAdd = (resolve) => {
  import('@/components/answer-add').then((module) => {
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

const UserCollection = (resolve) => {
  import('@/components/user-collection').then((module) => {
    resolve(module)
  })
}

const UserCircle = (resolve) => {
  import('@/components/user-circle').then((module) => {
    resolve(module)
  })
}

const UserQuestion = (resolve) => {
  import('@/components/user-question').then((module) => {
    resolve(module)
  })
}

const UserAttention = (resolve) => {
  import('@/components/user-attention').then((module) => {
    resolve(module)
  })
}

const UserAnswer = (resolve) => {
  import('@/components/user-answer').then((module) => {
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

const CircleList = (resolve) => {
  import('@/components/circle-list').then((module) => {
    resolve(module)
  })
}

const CircleType = (resolve) => {
  import('@/components/circle-type').then((module) => {
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

const Certification = (resolve) => {
  import('@/components/certification').then((module) => {
    resolve(module)
  })
}

const MessageCenter = (resolve) => {
  import('@/components/message-center').then((module) => {
    resolve(module)
  })
}

const ExpertList = (resolve) => {
  import('@/components/expert-list').then((module) => {
    resolve(module)
  })
}

const UserEdit = (resolve) => {
  import('@/components/user-edit').then((module) => {
    resolve(module)
  })
}

const Chat = (resolve) => {
  import('@/components/chat').then((module) => {
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
          component: QuestionType,
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
          component: CircleType
        }
      ]
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'collections',
          component: UserCollection
        },
        {
          path: 'circles',
          component: UserCircle
        },
        {
          path: 'questions',
          component: UserQuestion
        },
        {
          path: 'attentions',
          component: UserAttention
        },
        {
          path: 'answers',
          component: UserAnswer
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
      path: '/addAnswer',
      component: AnswerAdd
    },
    {
      path: '/addComment',
      component: CommentAdd
    },
    {
      path: '/editUserInfo',
      component: UserEdit
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/certification',
      component: Certification
    },
    {
      path: '/message',
      component: MessageCenter
    },
    {
      path: '/expert',
      component: ExpertList
    },
    {
      path: '/chat',
      component: Chat
    }
  ]
})
