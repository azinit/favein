import React from 'react'
import { Card as BCard } from 'react-bootstrap'
import { ChatSquare } from 'react-bootstrap-icons'
import Label from '../../label'
import Rate from '../../rate'

type Props = {
    card: ICard;
}

const CardItem = (props: Props) => {
    const { author, content, comments, dashboard, description, id, labels, list, name, rates } = props.card

    const rate = {
        author: {},
        id: -1,
        value: (!rates.length) ? 0 : Math.ceil(rates.map(r => r.value).reduce((a, b) => a + b) / rates.length)
    } as IRate
    return (
        <BCard className="card-item" style={{ width: '30%' }}>
            <BCard.Header> {author.username} / {name} </BCard.Header>
            <BCard.Body>
                <BCard.Title>{description}</BCard.Title>
                <BCard.Text>
                    {content.substring(0, 128)}...
                    {labels &&
                        <div className="labels d-flex justify-content-start">
                            {labels.map(l => <Label key={l.id} label={l} />)}
                        </div>
                    }
                </BCard.Text>
            </BCard.Body>
            <BCard.Footer className="text-muted d-flex align-items-center">
                <div className="flex-grow-1">{comments.length} <ChatSquare /></div>
                <Rate rate={rate} showAuthor={false} />
            </BCard.Footer>
        </BCard>
    )
}

export default CardItem
