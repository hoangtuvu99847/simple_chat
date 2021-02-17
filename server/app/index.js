const express = require('express')();
const http = require('http').createServer(express)
const io = require('socket.io')(http)
const PORT = 5000



io.on('connection', (socket) => {
    console.log('Connected! ');
})

http.listen(PORT, () => {
    console.log('Listening on *' + PORT)
})
