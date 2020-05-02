import React from 'react'
import { Card, OverlayTrigger, Popover } from 'react-bootstrap'
import { ChatSquare } from 'react-bootstrap-icons'
import Label from 'components/label'
import Rate from 'components/rate'
import './index.scss'
import { Link } from 'react-router-dom'

type Props = {
    card: ICard;
}

const CardItemCompact = (props: Props) => {
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

    const summary = description || content.substring(0, 128) + '...'
    const LabelsView = labels && (
        <div className="labels d-flex justify-content-start">
            {labels.map(l => <Label key={l.id} label={l} />)}
        </div>
    )
    const rate = {
        author: {},
        id: -1,
        value: (!rates.length) ? 0 : Math.ceil(rates.map(r => r.value).reduce((a, b) => a + b) / rates.length)
    } as IRate

    const popover = (
        <Popover id='card-content'>
            {/* <Popover.Title as="h3">{name}</Popover.Title> */}
            <Popover.Content>
                <div className="summary">
                    {summary}
                </div>
                <div className="mt-2 labels-container">
                    {LabelsView}
                </div>
                <div className="social d-flex mt-2">
                    <div className="flex-grow-1 comments">{comments.length} <ChatSquare /></div>
                    <Rate rate={rate} showAuthor={false} />
                </div>
            </Popover.Content>
        </Popover>
    )

    return (
        <Card className="card-item-compact w-400 btn-outline-secondary">
            <Link to={`/cards/${id}`} className='card-link'>
                <OverlayTrigger
                    trigger={[
                        "hover",
                        "focus"
                    ]}
                    placement="bottom"
                    overlay={popover}
                >
                    <Card.Body className='title'>{name}</Card.Body>
                </OverlayTrigger>
            </Link>
        </Card >
    )
}

export default CardItemCompact
