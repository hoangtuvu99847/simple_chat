import VueRouter from "vue-router";
import Room from "../components/Room";
import Login from "../components/Login";

const routes = [
    {path: '/room/:roomName', component: Room, name: 'room'},
    {path: '/login', component: Login, name: 'login'}
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router