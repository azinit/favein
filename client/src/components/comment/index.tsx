import React from 'react'
import { Toast, Button } from 'react-bootstrap'
import moment from 'moment'
import cn from 'classnames'
import { PeopleCircle, Trash } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import Markdown from 'components/markdown'
import './index.scss'
import { deleteComment } from 'store/entities/service'

type Props = {
    comment: IComment;
}

const Comment = (props: Props) => {
    const {
        id,
        author,
        content,
        createdAt
    } = props.comment
    const dispatch = useDispatch()
    const isCurrentUser = useSelector((state: IGlobalState) => state.auth.current.id === author.id)
    const { current } = useSelector((state: IGlobalState) => state.cards)

    const onDelete = () => {
        dispatch(deleteComment(current!.id, id))
    }

    return (
        <Toast className={cn("comment", { "border border-info": isCurrentUser })}>
            <Toast.Header>
                <PeopleCircle />
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">{author.username}</strong>
                <small>{moment(createdAt).format("DD.MM.YYYY")}</small>
                {isCurrentUser && (
                    <span className='delete-btn btn-outline-danger p-1 rounded' onClick={onDelete}>
                        <Trash/>
                    </span>
                )}
            </Toast.Header>
            <Toast.Body>
                <Markdown source={content} />
            </Toast.Body>
        </Toast>
    )
}

export default Comment
