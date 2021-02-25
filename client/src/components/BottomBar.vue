<template>
  <v-bottom-navigation fixed
                       v-model="value"
                       :background-color="color"
                       dark
                       shift
  >
    <v-btn @click="handleNavigateFriendTab">
      <span>Video</span>
      <v-icon>mdi-television-play</v-icon>
    </v-btn>
    <v-btn @click="handleNavigateHomeTab">
      <span>Music</span>
      <v-icon>mdi-music-note</v-icon>
    </v-btn>
    <v-btn @click="handleNavigateRoomTab">
      <span>Book</span>
      <v-icon>mdi-book</v-icon>
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
    handleNavigateFriendTab() {
      this.$router.push('/').catch(() => {
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