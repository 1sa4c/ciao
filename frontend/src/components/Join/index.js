import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

import './styles.css'

function Join(){
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const history = useHistory()


    function handleSubmit(e) {
        e.preventDefault()

        if(name && room)
            history.push(`/chat?name=${name}&room=${room}`)
    }

    return (
        <div className='main-container'>
            <div className='content-container'>
                <h1>Join</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Name' type='text' onChange={e => setName(e.target.value)}/>
                    <input placeholder='Room' type='text' onChange={e => setRoom(e.target.value)}/>

                    <button className='submit-button' type='submit'>Sign in</button>
                </form>
            </div>
        </div>
    )
}

export default Join