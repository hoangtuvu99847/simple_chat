<template>
  <v-container
      class="pa-0">
    <v-app-bar fixed color="primary" dark elevation="1">
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-toolbar-title>
        <p class="mb-0 mt-4">General</p>
        <p class="text-caption mb-4">
            <v-icon color="green" class="mb-1" x-small>mdi-brightness-1</v-icon>
          50 users</p>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

    </v-app-bar>
    <v-card-text class="overflow-y-auto">
      <v-container v-for="(msg, i) in messages" :key="i" class="px-0">
        <div
            :class="{ 'd-flex flex-row-reverse': msg.me }"
        >
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-hover>
                <v-chip
                    :color="msg.me ? 'primary' : ''"
                    dark
                    style="height:auto;white-space: normal;"
                    class="pa-3 mb-2"
                    v-on="on">
                  {{ msg.content }}
                  <sub
                      class="ml-2"
                      style="font-size: 0.5rem;"
                  >{{ msg.created_at }}</sub>
                </v-chip>
              </v-hover>
            </template>
          </v-menu>
        </div>
      </v-container>
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "Chat",
  data: () => ({
    activeChat: 1,
    messages: [
      {
        content: "lorem ipsum",
        me: true,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: true,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:12am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:14am"
      },
      {
        content: "dolor",
        me: true,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:12am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:14am"
      },
      {
        content: "dolor",
        me: true,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:12am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:14am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:12am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:14am"
      },
      {
        content: "dolor",
        me: true,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:12am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:14am"
      },
      {
        content: "dolor",
        me: true,
        created_at: "11:11am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:12am"
      },
      {
        content: "dolor",
        me: false,
        created_at: "11:14am"
      }
    ],
    messageForm: {
      content: "",
      me: true,
      created_at: "11:11am"
    }
  })
}
</script>

<style scoped>

</style>