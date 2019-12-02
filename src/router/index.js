import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Guests from '@/components/Guests'
import GuestAdd from '@/components/GuestAdd'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/guests',
            name: 'guests',
            component: Guests
        },
        {
            path:'/add',
            name: 'add',
            component: GuestAdd
        }
    ]
})
