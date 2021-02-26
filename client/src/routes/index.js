import VueRouter from "vue-router";
import Room from "../components/Room";
import Login from "../components/Login";
import ListUser from "@/components/ListUser/ListUser";

const routes = [
    {path: '/room/:roomName', component: Room, name: 'room'},
    {path: '/login', component: Login, name: 'login'},
    {path: '/users', component: ListUser, name: 'users'}
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router