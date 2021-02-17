import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import {io} from "socket.io-client";

const options = {transports: ["websocket"]};

Vue.use(new VueSocketIO({
        debug: true,
        connection: io('http://localhost:5000', options),
        vuex: {
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    })
);


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
