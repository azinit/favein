import React from 'react'
import { PersonFill } from 'react-bootstrap-icons'
import Card from 'react-bootstrap/Card'
type Props = {
    user: IUser;
}

const User = (props: Props) => {
    const { email, admin, id, username, roles } = props.user
    return (
        <div>
            <Card className="user">
                <Card.Header>
                    <PersonFill className="mr-2" />
                    {username}
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
