import React from 'react'
import {IoMdSend} from 'react-icons/io'

function Input({message, setMessage, sendMessage}){
    return(
        <form onSubmit={e => sendMessage(e)} className="message-form">
            <input
                type='text'
                placeholder='Type a message'
                value={message}
                onChange={e => setMessage(e.target.value)}
            />

            <button type="submit"><IoMdSend/></button>
        </form>
    )
}

export default Input