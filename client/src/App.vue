<template>
  <div id="app">
    <div class="input-area">
      <input type="text" v-model="message">
      <button @click.prevent="handleSendMessage">Send</button>
    </div>

    <div class="chat-area">

    </div>
    <button @click.prevent="logout">Logout</button>

    <div class="room-area" style="padding-top: 20px">
      <b>Rooms</b> <br>
      <br>
      <input type="text" v-model="roomName">
      <button @click.prevent="createRoom">Create</button>
    </div>
    <div class="list-room">
      <ul>
        <li v-for="(room, idx) in rooms" :key="idx">
          <button @click.prevent="handleJoinRoom(room)">{{room}}</button>
        </li>
      </ul>
    </div>
    <hr>

    <br>
    <div class="list-user">
      <ul>
        <li v-for="(user, idx) in users" :key="idx">
          <button @click.prevent="sendToUser(user)">{{user}}</button>
        </li>
      </ul>
    </div>
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
      room: 'general',
      rooms: [],
      users: [],
      roomName: ''
    }
  },
  created() {
    this.$socket.emit('join_room', this.room)
  },
  mounted() {

  },
  sockets: {
    connect: function () {
      console.log('socket connected: ', this.$socket.id)
    },
    chatMessage: function (data) {
      console.log('chat Message: ', data)
    },
    leaveRoom: function (data){
      console.log('>>>>> Leave room: ', data)
    },
    joinRoom: function (data){
      console.log('Join room: ', data)
    },
    room: function (data){
      'roomEntity' in data && (this.rooms = Object.keys(data['roomEntity']))
      console.log('POPUP: ', data)
    },
    sendPrivate: function (data){
      console.log('Private data: ', data)
    },
    online: function (data){
      this.users = data
      console.log('LIST_SOCKET_ID: ', data)
    },
  },
  methods: {
    handleSendMessage() {
      this.$socket.emit('chat_message', this.message)
      this.message = ''
    },
    handleJoinRoom(roomName){
      console.log('>> LEAVE ROOM: ', this.room)
      this.$socket.emit('leave_room', this.room)
      this.room = roomName
      console.log('>> JOIN ROOM: ', this.room)
      this.$socket.emit('join_room', this.room)
    },
    createRoom(){
      this.roomName !== '' ? this.$socket.emit('create_room', this.roomName) : null
    },
    deleteRoom(){

    },
    logout(){
      this.$socket.emit('leave_room', this.room)
      this.$socket.emit('join_room', 'general')

    },
    sendToUser(user){
      console.log('USER: ', user)
      this.$socket.emit('private_message', {
        message: 'PRIVATE_MESSAGE',
        socketID: user
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
