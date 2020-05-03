import React from 'react'
import { Button } from 'react-bootstrap'
import { PencilSquare, X } from 'react-bootstrap-icons'

type Props = {
    mutationState: MutationState;
    setMutationState: (ms: MutationState) => void;
}

const CardActions = (props: Props) => {
    const { mutationState, setMutationState } = props
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
                <Button
                    variant="outline-secondary"
                    className='card-action cancel-btn'
                    size="sm"
                    onClick={() => setMutationState('preview')}
                >
                    <X size={16} />
                </Button>
            )
        default:
            return (null)
    }
}

export default CardActions
