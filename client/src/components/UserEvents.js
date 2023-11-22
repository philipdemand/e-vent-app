import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function UserEvents() {

    const {user} = useContext(UserContext)

    return(
        <ul>
            <h2>{user.events.map(event => <li key={event.id}>{event.title}</li>)}</h2>
        </ul>
    )
}

export default UserEvents