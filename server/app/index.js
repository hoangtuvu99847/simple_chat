const app = require('express')();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const STATUS = require('./status')
const moment = require('moment')


const PORT = 5000

const MESSAGE_TYPE = {
    NOTIFY: 'notify',
    MESSAGE: 'message',
    POPUP: 'popup'
}
const RESULT_TYPE = {
    SUC: 'success',
    ERR: 'error',
    WAR: 'warning'
}

let rooms = []

//========================================
// Room object instance: {
// roomName: [Array List User]
//}
let roomEntity = {}
//========================================

let username = {}
let listSocketConnected = []

const createMessage = (content, author, type, room) => {
    return {
        content: content,
        timeCreated: moment().format('LT'),
        author: author,
        type: type,
        room: room
    }
}

const createPopup = (content, type, result) => {
    return {
        content: content,
        type: type,
        timeCreated: moment().format('LT'),
        result: result
    }
}
const handleUserInRoom = () => {
    return
}

const handleDisconnect = (socket) => {
    const messageLeftRoom = socket.id + STATUS.ROOM.USER_ACTION.LEAVE
    listSocketConnected = listSocketConnected.filter(i => i !== socket.id)
    delete username[socket.username]
    socket.leave(socket.room)
    io.to(socket.room).emit('leaveRoom',
        createMessage(messageLeftRoom, MESSAGE_TYPE.NOTIFY, socket.room))
    console.log('User Disconnect! ', socket.id);

    io.emit('online', listSocketConnected)
}

const handleConnect = (socket) => {
    listSocketConnected = [...listSocketConnected, socket.id]
    io.emit('online', listSocketConnected)
    io.emit('room', {
        rooms: rooms
    })
}
const handleChat = (socket, msg) => {
    console.log('SEND_MESSAGE: ', socket.room);
    const message = createMessage(msg, socket.id, MESSAGE_TYPE.MESSAGE, socket.room)
    io.to(socket.room).emit('chatMessage', message)
}
const handleJoin = (socket, room) => {
    const messageJoinRoom = `${socket.id} has joined !`

    socket.room = room
    socket.join(room)
    username[username] = socket.id
    if (socket.room in roomEntity) {
        Object.keys(roomEntity).forEach(item => {
            roomEntity[item].includes(socket.id)
                && (roomEntity[item] = roomEntity[item].filter(u => u !== socket.id))
        })
        roomEntity[socket.room] = [...roomEntity[socket.room], username[username]]
    }
    console.log('ROOM_ENTITY: ', roomEntity);
    io.to(socket.room).emit('joinRoom',
        createMessage(messageJoinRoom, username[username], MESSAGE_TYPE.NOTIFY, socket.room))
    io.emit('room', {
        roomEntity: roomEntity
    })
}
const handleLeave = (socket, room) => {
    console.log('LEAVE_SOCKET: ', socket.room);
    const messageLeftRoom = socket.id + STATUS.ROOM.USER_ACTION.LEAVE
    socket.leave(socket.room)

    // Handle remove room if room has not user
    Object.keys(roomEntity).forEach(item => {
        roomEntity[item].includes(socket.id)
            && (roomEntity[item] = roomEntity[item].filter(u => u !== socket.id));
    });
    (socket.room !== 'general' && roomEntity[socket.room].length === 0)
        && delete roomEntity[socket.room]

    io.to(socket.room).emit('leaveRoom',
        createMessage(messageLeftRoom, username[username], MESSAGE_TYPE.NOTIFY, socket.room))
    io.emit('room', { roomEntity: roomEntity })
}
const handlePrivateMessage = (socket, client) => {
    io.to(client.socketID).emit('sendPrivate', client.message)
    console.log('SEND_PRIAVTE: ', socket.id);
}

const onCreateRoom = (socket, room) => {

    roomEntity[room] = []
    // rooms = [...rooms, room]
    popup = createPopup(STATUS.ROOM.CREATE.SUCCESS, MESSAGE_TYPE.POPUP, RESULT_TYPE.SUC)
}

const handleCreateRoom = (socket, room) => {
    console.log('--> CREATE_ROOM: ', room);
    let popup = '';
    room in roomEntity ?
        popup = createPopup(STATUS.ROOM.CREATE.DUPLICATED, MESSAGE_TYPE.POPUP, RESULT_TYPE.WAR)
        : onCreateRoom(socket, room)

    socket.emit('room', {
        status: popup,
    })
    io.emit('room', {
        roomEntity: roomEntity
    })
}

const handleSocket = () => {
    io.on('connection', (socket) => {
        handleConnect(socket)
        // Socket join room
        socket.on('join_room', (room) => {
            handleJoin(socket, room)
        })
        // Socket handle send private message
        socket.on('private_message', (client) => {
            handlePrivateMessage(socket, client)
        })
        // Socket handle left room
        socket.on('leave_room', (room) => {
            handleLeave(socket, room)
        })
        socket.on('create_room', (room) => {
            handleCreateRoom(socket, room)
        })
        // Socket handle send message
        socket.on('chat_message', (msg) => {
            handleChat(socket, msg)
        })
        // Socket handle discoonnect
        socket.on('disconnect', () => {
            handleDisconnect(socket)
        })
    })
}
handleSocket()


http.listen(PORT, () => {
    console.log('Listening on *' + PORT)
})
