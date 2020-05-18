import React from 'react'
import { PersonFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
type Props = {
    user: IUser;
}

const User = (props: Props) => {
    const { email, id, username, roles } = props.user
    return (
        <div>
            <Card className="user">
                <Card.Header>
                    <PersonFill className="mr-2" />
                    <Link to={`/users/${id}`}>{username}</Link>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{email} </Card.Title>
                    <Card.Subtitle className="text-muted text-light">{roles.join(', ')} </Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default User
