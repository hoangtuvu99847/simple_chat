<template>
  <div id="app">
    <div class="input-area">
      <input type="text" v-model="message">
      <button @click.prevent="handleSendMessage">Send</button>
    </div>

    <div class="chat-area">

    </div>
    <div class="room-area" style="padding-top: 20px">
      <button @click.prevent="joinRoom1">Room 1</button>
      <button @click.prevent="joinRoom2">Room 2</button>
      <button @click.prevent="joinRoom3">Room 3</button>
      <button @click.prevent="logout">Logout</button>
    </div>
    <br>
    <button @click.prevent="sendPrivate">Private</button>

    <router-view></router-view>
  </div>

</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      message: '',
      room: {}
    }
  },
  created() {
    this.$socket.emit('join_room', 'general')
  },
  mounted() {

  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    chatMessage: function (data) {
      console.log('chat Message: ', data)
    },
    leaveRoom: function (data){
      console.log('Leave room: ', data)
    },
    joinRoom: function (data){
      console.log('Join room: ', data)
    },
    sendPrivate: function (data){
      console.log('Private data: ', data)
    }
  },
  methods: {
    handleSendMessage() {
      this.$socket.emit('chat_message', this.message)
      this.message = ''
    },
    handleJoinRoom(roomName){
      this.$socket.emit('leave_room', 'general')
      this.$socket.emit('join_room', roomName)
    },
    joinRoom1() {
      this.room = 'room1'
      this.handleJoinRoom(this.room)
    },
    joinRoom2() {
      this.room = 'room2'
      this.handleJoinRoom(this.room)
    },
    joinRoom3() {
      this.room = 'room3'
      this.handleJoinRoom(this.room)
    },
    logout(){
      this.$socket.emit('leave_room', this.room)
      this.$socket.emit('join_room', 'general')

    },
    sendPrivate(){
      console.log('SOCKET: ', this.$socket.id)
      this.$socket.emit('private_message', {
        message: 'PRIVATE MESSAGE',
        socketId: this.$socket.id,
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
