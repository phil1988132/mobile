import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index'
//  import List from '@/components/page/List'
/**
 * 重写路由的push方法
 */
Vue.use(Router)
/*  const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
*/

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/lista:tag',
      name: 'List',
      component: resolve => require(['../components/page/List.vue'], resolve)
    },
    {
      path: '/listb/:k',
      name: 'Lista',
      component: resolve => require(['../components/page/List.vue'], resolve)
    },
    {
      path: '/listc/:c',
      name: 'Lista',
      component: resolve => require(['../components/page/List.vue'], resolve)
    },
    {
      path: '/listt/:t',
      name: 'Lista',
      component: resolve => require(['../components/page/List.vue'], resolve)
    },
    {
      path: '/liststar/:stars',
      name: 'Lista',
      component: resolve => require(['../components/page/List.vue'], resolve)
    },
    {
      path: '/history',
      name: 'History',
      component: resolve => require(['../components/page/History.vue'], resolve)
    },
    {
      path: '/detail:no',
      name: 'Detail',
      component: resolve => require(['../components/page/Detail.vue'], resolve)
    }
  ]
})
