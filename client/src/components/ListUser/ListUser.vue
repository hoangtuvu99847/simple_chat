<template>
  <v-container>
    <v-list dense>
      <v-subheader>User Online</v-subheader>
      <v-list-item-group
          v-model="socketID"
          color="primary"
      >
        <v-list-item
            v-for="(item, i) in getListUserOnline"
            :key="i"
        >
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "ListUser",
  data: () => ({
    users: [],
    socketID: ''
  }),
  computed: {
    getListUserOnline() {
      return this.$store.state.usersOnline
    }
  },
  created() {
    console.log('USERS: ', this.getListUserOnline)
  },
  sockets: {},
  methods: {
    selectUser(user) {
      console.log('USER_CLICK: ', user)
    }
  }
}
</script>

<style scoped>

</style>