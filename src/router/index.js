import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '仪表盘',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: '例如',
    meta: { title: '例如', icon: 'example', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'table',
        name: '大表格',
        component: () => import('@/views/table/index'),
        meta: { title: '大表格', icon: 'table', roles: ['admin', 'editor'] }
      },
      {
        path: 'tree',
        name: '树状图',
        component: () => import('@/views/tree/index'),
        meta: { title: '树状图', icon: 'tree', roles: ['admin', 'editor'] }
      },
      {
        path: 'Cascader',
        name: '级联菜单',
        component: () => import('@/views/Cascader/index'),
        meta: { title: '级联菜单', icon: 'star', roles: ['admin', 'editor'] }
      },
      {
        path: 'dic',
        name: '字典',
        component: () => import('@/views/Dictionary/index'),
        meta: { title: '字典', icon: 'star', roles: ['admin', 'editor'] }
      },
      {
        path: 'Scroll',
        name: '无线滚动',
        component: () => import('@/views/Scroll/index'),
        meta: { title: '无线滚动', icon: 'star', roles: ['admin', 'editor'] }
      },
      {
        path: 'Upload',
        name: '压缩文件',
        component: () => import('@/views/Upload/index'),
        meta: { title: '压缩文件', icon: 'star', roles: ['admin', 'editor'] }
      },
      {
        path: 'Video',
        name: '视频播放',
        component: () => import('@/views/Video/index'),
        meta: { title: '视频播放', icon: 'star', roles: ['admin', 'editor'] }
      },
      {
        path: 'H5Video',
        name: 'H5视频播放',
        component: () => import('@/views/H5Video/index'),
        meta: { title: '视频播放', icon: 'star', roles: ['admin', 'editor'] }
      },
    ]
  },
]
