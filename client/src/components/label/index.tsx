import React from 'react'
import { Badge } from 'react-bootstrap'

type Props = {
    label: ILabel;
}

const Label = (props: Props) => {
    const { color, name } = props.label
    return (
        <Badge
            className="label p-2"
            style={{ backgroundColor: color, color: '#fff' }}
        >
            {name}
        </Badge>
    )
}

export default Label
