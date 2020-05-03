import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getActions } from 'store/entities/service'
import { Form, Button } from 'react-bootstrap'
import TextField from 'components/text-field'

type Props = {
    cardId: number;
}

const CommentForm = ({ cardId }: Props) => {

    const { updateDTODetails } = getActions('comments')
    const dispatch = useDispatch()
    const { content = "" } = useSelector((state: IGlobalState) => state.comments.payload)

    const onAdd = () => {
        dispatch(addComment(cardId))
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(updateDTODetails({ [name]: value }))
    }
    return (
        <Form className='p-4 shadow-sm bg-light'>
            <TextField
                type="textarea"
                label='Оставить комментарий'
                name="content"
                placeholder="Ваш комментарий"
                onChange={onChange}
                value={content}
            />
            <Button onClick={onAdd} variant="info">Add</Button>
        </Form>
    )
}

export default CommentForm
