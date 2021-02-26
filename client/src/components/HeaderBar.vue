<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-container class="mt-7">
        <v-text-field
            height="5px"
            v-model="searchData"
            label="Search"
            outlined
            dense
        ></v-text-field>
      </v-container>

    <v-spacer></v-spacer>


    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderBar",
  data: () => ({
    searchData: ''
  })
}
</script>

<style scoped>

</style>