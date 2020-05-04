import React from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { Trash, Plus } from 'react-bootstrap-icons'
import './index.scss'
import { detachLabel, attachLabel } from 'store/entities/service'

type Props = {
    label: ILabel;
    mutationState: MutationState;
    isRelated: boolean;
}

const MutableLabel = (props: Props) => {
    const { label, mutationState, isRelated } = props
    const { color, name, id } = label
    const cardId = +window.location.pathname.replace('/cards/', '')
    const dispatch = useDispatch()

    const isPreview = mutationState === 'preview'
    // const isEditing = mutationState === 'edit'
    
    const onClick = () => {
        switch (mutationState) {
            case 'edit':
                const action = isRelated ? detachLabel : attachLabel
                dispatch(action(cardId, id))
        }
    }
    const icon = isRelated ? <Trash /> : <Plus />
    const className = isRelated ? 'related' : 'other'

    if (isPreview && !isRelated) {
        return (null)
    }

    return (
        <Badge
            className={cn("mutable-label label p-2", mutationState, className)}
            style={{ backgroundColor: color, color: '#fff' }}
            onClick={onClick}
        >
            <span className="name">{name}</span>
            <span className="action">{icon}</span>
        </Badge>
    )
}

export default MutableLabel
