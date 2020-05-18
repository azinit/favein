import React from 'react'
import { Badge } from 'react-bootstrap'
import './index.scss'

type Props = {
    label: ILabel;
    onClick?: (id: number) => void;
}

const Label = (props: Props) => {
    const { onClick, label } = props
    const { color, name, id } = label
    return (
        <Badge
            className="label p-2"
            style={{ backgroundColor: color, color: '#fff' }}
            onClick={() => onClick?.(id)}
        >
            {name}
        </Badge>
    )
}

export default Label
