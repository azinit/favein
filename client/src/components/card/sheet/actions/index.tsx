import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getActions } from 'store/entities/service'
import { PencilSquare, X, FileEarmarkCheck } from 'react-bootstrap-icons'

const { setMutationState } = getActions('cards')

type Props = {
    onSave: Function;
    onCancel: Function;
}

const CardActions = (props: Props) => {
    const { onSave, onCancel } = props
    const { mutationState } = useSelector((state: IGlobalState) => state.cards)
    const dispatch = useDispatch()

    switch (mutationState) {
        case 'preview':
            return (
                <Button
                    variant="outline-info"
                    className='card-action edit-btn'
                    size="sm"
                    onClick={() => dispatch(setMutationState('edit'))}
                >
                    <PencilSquare size={16} />
                </Button>
            )
        case 'edit':
            return (
                <>
                    <Button
                        variant="outline-success"
                        className='card-action cancel-btn'
                        size="sm"
                        onClick={() => onSave()}
                        style={{ marginRight: 40 }}
                    >
                        <FileEarmarkCheck size={16} />
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className='card-action cancel-btn'
                        size="sm"
                        onClick={() => onCancel()}
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
