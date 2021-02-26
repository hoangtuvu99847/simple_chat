import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        usersOnline: []
    },
    mutations: {
        USER_CONNECT(state, users) {
            state.usersOnline = users
        }
    },
    actions: {
        userConnect(context, listUser) {
            console.log('newUser: ', listUser)
            context.commit('USER_CONNECT', listUser)
        }
    }
})

export default store