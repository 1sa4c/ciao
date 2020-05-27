import React, {useState, useEffect} from 'react'
import qs from 'query-string'
import io from 'socket.io-client'

import './styles.css'

import Header from '../Header'
import Input from '../Input'
import Messages from '../Messages'
import UsersOnline from '../UsersOnline'

let socket

function Chat({location}){
    const serverAdress = 'localhost:5500'
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const {name, room} = qs.parse(location.search)

        socket = io(serverAdress)

        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [serverAdress, location.search])

    
    useEffect(() => {
        socket.once('message', message => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({users}) => {
            setUsers(users)
        })
    }, [messages])

    function sendMessage(e){
        e.preventDefault()

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className='main-container'>
            <div className='content-container'>
                <Header room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
                <UsersOnline users={users}/>
        </div>
    )
}

export default Chat