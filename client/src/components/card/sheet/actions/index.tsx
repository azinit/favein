import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getActions, deleteEntity } from 'store/entities/service'
import { PencilSquare, X, FileEarmarkCheck, Trash } from 'react-bootstrap-icons'

const { setMutationState } = getActions('cards')

type Props = {
    onSave: Function;
    onCancel: Function;
    id: number;
}

const CardActions = (props: Props) => {
    const { onSave, onCancel, id } = props
    const { mutationState } = useSelector((state: IGlobalState) => state.cards)
    const dispatch = useDispatch()

    const deleteBtn = (
        <Button
            variant="outline-danger"
            className='card-action edit-btn'
            size="sm"
            onClick={() => dispatch(deleteEntity('cards', id))}
        >
            <Trash />
        </Button>
    )

    switch (mutationState) {
        case 'preview':
            return (
                <>
                    {deleteBtn}
                    <Button
                        variant="outline-info"
                        className='card-action edit-btn'
                        size="sm"
                        onClick={() => dispatch(setMutationState('edit'))}
                        style={{ marginRight: 40 }}
                    >
                        <PencilSquare size={16} />
                    </Button>
                </>
            )
        case 'edit':
            return (
                <>
                    {deleteBtn}
                    <Button
                        variant="outline-success"
                        className='card-action save-btn'
                        size="sm"
                        onClick={() => onSave()}
                        style={{ marginRight: 80 }}
                    >
                        <FileEarmarkCheck size={16} />
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className='card-action cancel-btn'
                        size="sm"
                        onClick={() => onCancel()}
                        style={{ marginRight: 40 }}
                    >
                        <X size={16} />
                    </Button>
                </>
            )
        default:
            return (null)
    }
}

export default CardActions
