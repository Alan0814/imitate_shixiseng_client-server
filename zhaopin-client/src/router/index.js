import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/Msite/Msite'
import Employee from '../pages/Employee/Employee'
import Post from '../pages/Post/Post'
import PostPublish from '../pages/Post/PostPublish/PostPublish'
import PostShow from '../pages/Post/PostShow/PostShow'
import Profile from '../pages/Profile/Profile'
import FirmInfo from '../pages/Profile/FirmInfo/FirmInfo'
import Verification from '../pages/Profile/Verification/Verification'
import Self from '../pages/Profile/Self/Self'
import Register from '../pages/Register/Register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'msite',
      meta: {
        showHeader: true
      }
    },
    {
      path:'/msite',
      component:Msite,
      meta: {
        showHeader: true
      }
    },
    {
      path:'/register',
      component:Register,
      meta: {
        showHeader: true
      }
    },
    {
      path:'/employee',
      component:Employee,
    },
    {
      path:'/post',
      component:Post,
      children: [
        {
          path: '/post/publish',
          component: PostPublish,
          meta: {
            parent: '/post'
          }
        },
        {
          path: '/post/show',
          component: PostShow,
          meta: {
            parent: '/post'
          }
        },
        {
          path: '',
          redirect: '/post/show'
        },
      ]
    },
    {
      path:'/profile',
      component:Profile,
      children: [
        {
          path: '/profile/firmInfo',
          component: FirmInfo,
          meta: {
            parent: '/profile'
          }
        },
        {
          path: '/profile/verification',
          component: Verification,
          meta: {
            parent: '/profile'
          }
        },
        {
          path: '/profile/self',
          component: Self,
          meta: {
            parent: '/profile'
          }
        },
        {
          path: '',
          redirect: '/profile/verification'
         },
      ]
    },
  ]
})
