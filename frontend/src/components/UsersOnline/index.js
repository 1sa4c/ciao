import React from 'react'

function UsersOnline({users}){
    return(
        <div>
            <h2>Users online</h2>
            {users.map((user, i) => <div key={i}>{user.name}</div>)}
        </div>
    )
}

export default UsersOnline