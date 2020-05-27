const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5500

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const router = require('./routes')
app.use(router)

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')


io.on('connect', socket => {
    socket.on('join', ({name, room}, callback) => {
        try{
            const user = addUser({id: socket.id, name, room})
            socket.join(user.room)
            socket.emit('message', {user: 'sys', text: `Welcome to ${user.room} room!`})
            socket.broadcast.to(user.room).emit('message', {user: 'sys', text: `${user.name} joined the room`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
            callback()
        }catch(err) {
            return callback(err);
        }
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: message})
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) io.to(user.room).emit('message', {user: 'sys', text: `${user} left`})
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})