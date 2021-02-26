<template>
  <v-app>
    <header-bar/>
    <v-main>
      <main-navigation/>
    </v-main>
    <bottom-bar/>
  </v-app>
</template>

<script>

import HeaderBar from "@/components/HeaderBar";
import BottomBar from "@/components/BottomBar";
import MainNavigation from "@/components/Navigation/MainNavigation";


export default {
  name: 'App',

  components: {
    MainNavigation,
    BottomBar,
    HeaderBar
  },
  data: () => ({
    value: 1
  }),
  sockets: {
    connect: function (){
      console.log('Socket connected!')
    },
    online: function (users){
      console.log('List user online: ', users)
      this.$store.dispatch('userConnect', users)

    }
  }
};
</script>
