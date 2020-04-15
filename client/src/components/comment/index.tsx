import React from 'react'
import Toast from 'react-bootstrap/Toast'
import { PeopleCircle } from 'react-bootstrap-icons'
import moment from 'moment'
import './index.scss'

type Props = {
    comment: IComment;
}

const Comment = (props: Props) => {
    const { id, author, content, createdAt } = props.comment
    return (
        <Toast className="comment">
            <Toast.Header>
                <PeopleCircle />
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">{author.username}</strong>
                <small>{moment(createdAt).format("DD.MM.YYYY")}</small>
            </Toast.Header>
            <Toast.Body>
                {content}
            </Toast.Body>
        </Toast>
    )
}

export default Comment
