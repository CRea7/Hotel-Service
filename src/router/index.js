import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Guests from '@/components/Guests'

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
        }
    ]
})
