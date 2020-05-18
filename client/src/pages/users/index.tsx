import React, { useState, useEffect } from 'react'
import User from 'components/user'
import API from 'api'
import Header from 'components/header'

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        API.users.readList().then(response => setUsers(response.data))
    }, [])

    return (
        <div className='page page-users'>
            <Header />
            <section className="jumbotron text-center">
                <h2>Пользователи</h2>
            </section>
            <section className="jumbotron bg-white">
                <div className="container">
                    {users.map(u => (
                        <User user={u} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default UsersPage
