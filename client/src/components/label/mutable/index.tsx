import React from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import './index.scss'
import { detachLabel } from 'store/entities/service'

type Props = {
    label: ILabel;
    canDelete?: boolean;
}

const MutableLabel = (props: Props) => {
    const [hover, setHover] = React.useState(false)
    const { label, canDelete = true } = props
    const { color, name, id } = label
    const cardId = +window.location.pathname.replace('/cards/', '')

    const dispatch = useDispatch()
    
    const toggleHover = () => setHover(!hover)
    const onClick = () => {
        if (hover) {
            dispatch(detachLabel(cardId, id))
        }
    }

    return (
        <Badge
            className={cn("mutable-label label p-2", { canDelete })}
            style={{ backgroundColor: color, color: '#fff' }}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={onClick}
        >
            <span className="name">{name}</span>
            <span className="action"><Trash /></span>
        </Badge>
    )
}

export default MutableLabel
