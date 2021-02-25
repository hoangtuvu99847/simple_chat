import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import VueRouter from 'vue-router'
import {io} from "socket.io-client";
import router from "./routes";
import vuetify from './plugins/vuetify';

const options = {
    transports: ["websocket"],
};

Vue.use(VueRouter)
Vue.use(new VueSocketIO({
        debug: false,
        connection: io('http://localhost:5000', options),
        vuex: {
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    })
);


Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
