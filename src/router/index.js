import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Guests from '@/components/Guests'
import GuestAdd from '@/components/GuestAdd'
import Rooms from '@/components/Rooms'
import Login from "@/components/Login";

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
        },
        {
            path:'/rooms',
            name: 'rooms',
            component: Rooms
        },
        {
            path:'/users/login',
            name:'login',
            component: Login
        }
    ]
})
