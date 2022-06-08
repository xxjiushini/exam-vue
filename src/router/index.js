import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = [
    { path: '*', redirect: '/index' },
    { path: '/', redirect: '/index' },
    {
        path: '/index',
        name: 'index',
        component:() => import('@/views'),//首页
        meta: {
            isLogin: false,
            title: '首页'
        }
    },
    {
        path: '/onlineTest',
        name: 'onlineTest',
        component: () => import('@/views/onlinePractice/onlineTest'),//在线考试
        meta: {
            isLogin: true,
            title: '在线考试'
        }
    }

]

const createRouter = () => new Router({
    // mode: 'history',
    routes: Routes
})

const index = createRouter()

export default index
