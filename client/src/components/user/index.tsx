import React from 'react'

type Props = {
    user: IUser;
}

const User = (props: Props) => {
    const { email, admin, id, username, roles } = props.user
    return (
        <div>
            { username }
        </div>
    )
}

export default User
