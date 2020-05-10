import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getActions, deleteEntity } from 'store/entities/service'
import { PencilSquare, X, FileEarmarkCheck, Trash, Star } from 'react-bootstrap-icons'
import './index.scss'
import { addFave, deleteFave } from 'store/auth/service'

const { setMutationState } = getActions('cards')

type Props = {
    onSave: Function;
    onCancel: Function;
    id: number;
    isFaved: boolean;
}

const CardActions = (props: Props) => {
    const { onSave, onCancel, id, isFaved } = props
    const { mutationState } = useSelector((state: IGlobalState) => state.cards)
    const dispatch = useDispatch()

    const btnDelete = (
        <Button
            variant="outline-danger"
            className='card-action delete-btn'
            size="sm"
            onClick={() => dispatch(deleteEntity('cards', id))}
        >
            <Trash size={16} />
        </Button>
    )
    const btnFave = (
        <Button
            variant="outline-warning"
            className='card-action fave-btn'
            size="sm"
            onClick={() => {
                const action = isFaved ? deleteFave : addFave;
                dispatch(action(id))
            }}
            active={isFaved}
        >
            <Star size={16} />
        </Button>
    )
    const btnEdit = (
        <Button
            variant="outline-info"
            className='card-action edit-btn'
            size="sm"
            onClick={() => dispatch(setMutationState('edit'))}
        >
            <PencilSquare size={16} />
        </Button>
    )
    const btnSave = (
        <Button
            variant="outline-success"
            className='card-action save-btn'
            size="sm"
            onClick={() => onSave()}
        >
            <FileEarmarkCheck size={16} />
        </Button>
    )
    const btnCancel = (
        <Button
            variant="outline-secondary"
            className='card-action cancel-btn'
            size="sm"
            onClick={() => onCancel()}
        >
            <X size={16} />
        </Button>
    )


    const actionsRenderer = () => {
        switch (mutationState) {
            case 'preview':
                return (
                    <>
                        {btnFave}
                        {btnDelete}
                        {btnEdit}
                    </>
                )
            case 'edit':
                return (
                    <>
                        {btnFave}
                        {btnDelete}
                        {btnSave}
                        {btnCancel}
                    </>
                )
            default:
                return (null)
        }
    }

    return (
        <div className="card-actions">
            {actionsRenderer()}
        </div>
    )
}

export default CardActions
