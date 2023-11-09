import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function UserEvents() {

    const {user} = useContext(UserContext)

    return(
        <ul>
            {user.events.map(event => <li key={event.id}>{event.title}</li>)}
        </ul>
    )
}

export default UserEvents