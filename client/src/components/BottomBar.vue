<template>
  <v-bottom-navigation fixed
                       v-model="value"
                       :background-color="color"
                       dark
                       shift
  >
    <v-btn @click="handleNavigateUserTab">
      <span>User</span>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>
    <v-btn @click="handleNavigateHomeTab">
      <span>Message</span>
      <v-icon>mdi-forum</v-icon>
    </v-btn>
    <v-btn @click="handleNavigateRoomTab">
      <span>Room</span>
      <v-icon>mdi-home-floor-g</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomBar",
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        default:
          return 'blue-grey'
      }
    },
  },
  data: () => ({
    value: 1
  }),
  methods: {
    handleNavigateUserTab() {
      this.$router.push('users').catch(() => {
      })
    },
    handleNavigateHomeTab() {
      this.$router.push('login').catch(() => {
      })
    },
    handleNavigateRoomTab() {

    }
  }
}
</script>

<style scoped>

</style>