import React from 'react'
import { Button } from 'react-bootstrap'
import { PencilSquare, X, FileEarmarkCheck } from 'react-bootstrap-icons'

type Props = {
    mutationState: MutationState;
    setMutationState: (ms: MutationState) => void;
    onSave: Function;
    onCancel: Function;
}

const CardActions = (props: Props) => {
    const { mutationState, setMutationState, onSave, onCancel } = props
    switch (mutationState) {
        case 'preview':
            return (
                <Button
                    variant="outline-info"
                    className='card-action edit-btn'
                    size="sm"
                    onClick={() => setMutationState('edit')}
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
