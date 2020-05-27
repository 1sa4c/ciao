import React from 'react'

import ReactEmoji from 'react-emoji'

function Message({message: {user, text}, name}){
    let sentByUser = user === name.trim().toLowerCase()
    return(
        sentByUser
        ?(
            <div className="message-container my-message">
                <p className="user">{name.trim().toLowerCase()}</p>
                <div className="text-container">
                    <p className="text">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        :(
        <div className="message-container others-message">
            <div className="text-container">
                <p className="text">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="user">{user}</p>
        </div>
        )
    )
}

export default Message