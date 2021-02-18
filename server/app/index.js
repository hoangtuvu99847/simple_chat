const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const moment = require('moment')


const PORT = 5000

const MESSAGE_TYPE = {
    NOTIFY: 'notify',
    MESSAGE: 'message'
}



let rooms = []
let username = {}
let socketConnected = {}

const createMessage = (content, author, type, room) => {
    return {
        content: content,
        timeCreated: moment().format('LT'),
        author: author,
        type: type,
        room: room
    }
}
const handleRoomAdd = () => {
    return
}

const handleRoomDelete = () => {
    return
}

const initSocket = () => {

    io.on('connection', (socket) => {

        console.log('-----> Connected: ', socket.id);
        const messageLeftRoom = `${socket.id} has left room!`
        const messageJoinRoom = `${socket.id} has joined !`

        socket.on('private_message', (socketClient) => {
            console.log('socketClient: ', socketClient);
            io.to(socketClient.socketId).emit('sendPrivate', socket.id, socketClient.message)
            console.log('SEND_PRIAVTE: ', socket.id);
        })
        // Socket join room
        socket.on('join_room', (room) => {
            socket.room = room
            socket.join(room)
            username[username] = socket.id
            // Handle send status user connected!
            rooms = [...rooms, socket.room]
            const notify = createMessage(messageJoinRoom, MESSAGE_TYPE.NOTIFY, socket.room)
            io.to(socket.room).emit('joinRoom', notify)
        })

        // Socket left room
        socket.on('leave_room', () => {
            socket.leave(socket.room)
            const notify = createMessage(messageLeftRoom, MESSAGE_TYPE.NOTIFY, socket.room)
            io.to(socket.room).emit('leaveRoom', notify)
        })

        // Socket send message
        socket.on('chat_message', (msg) => {
            console.log('SEND_MESSAGE: ', socket.room);
            const message = createMessage(msg, socket.id, MESSAGE_TYPE.MESSAGE, socket.room)
            io.to(socket.room).emit('chatMessage', message)

        })
        socket.on('disconnect', () => {
            delete username[socket.username]
            socket.leave(socket.room)
            const notify = createMessage(messageLeftRoom, MESSAGE_TYPE.NOTIFY, socket.room)
            io.to(socket.room).emit('leaveRoom', notify)
            console.log('User Disconnect! ');
        })
    })
}
initSocket()


http.listen(PORT, () => {
    console.log('Listening on *' + PORT)
})
