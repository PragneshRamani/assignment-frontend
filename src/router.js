import Vue from 'vue'
import Router from 'vue-router'
import Transactions from './components/Transactions.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Transactions
        },
        {
            path :'/login',
            name: 'login',
            component: Login
        },
        {
            path :'/logout',
            name: 'logout',
            component: Logout
        },
        {
            path :'*',
            redirect: '/'
        }
    ],
    mode: 'history'
})
