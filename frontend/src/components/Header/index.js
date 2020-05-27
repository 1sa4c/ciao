import React from 'react'
import {RiCloseLine, RiRadioButtonLine} from 'react-icons/ri'

import './styles.css'

function Header({room}){
    return(
        <div className="header">
            <div className="left-container">
                <RiRadioButtonLine/>
                <h2>{room}</h2>
            </div>
            <div className="right-container">
                <a href="/"><RiCloseLine/></a>
            </div>
        </div>
    )
}

export default Header