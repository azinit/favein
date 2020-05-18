import React from 'react'
import { Card } from 'react-bootstrap'
import { ChatSquare } from 'react-bootstrap-icons'
import Label from 'components/label'
import Rate from 'components/rate'

type Props = {
    card: ICard;
    compact?: boolean;
}

const CardItem = (props: Props) => {
    const {
        author,
        content,
        comments,
        dashboard,
        description,
        id,
        labels,
        list,
        name,
        rates
    } = props.card

    const rate = {
        author: {},
        id: -1,
        value: (!rates.length) ? 0 : Math.ceil(rates.map(r => r.value).reduce((a, b) => a + b) / rates.length)
    } as IRate
    return (
        <Card className="card-item" style={{ width: '30%' }}>
            <Card.Header> {author.username} / {name} </Card.Header>
            <Card.Body>
                <Card.Title>{description}</Card.Title>
                <Card.Text>
                    {content.substring(0, 128)}...
                    {labels &&
                        <div className="labels d-flex justify-content-start">
                            {labels.map(l => <Label key={l.id} label={l} />)}
                        </div>
                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex align-items-center">
                <div className="flex-grow-1">{comments.length} <ChatSquare /></div>
                <Rate rate={rate} showAuthor={false} />
            </Card.Footer>
        </Card>
    )
}

export default CardItem
