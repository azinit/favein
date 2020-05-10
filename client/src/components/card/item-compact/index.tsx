import React, { MouseEvent } from 'react'
import cn from 'classnames'
import { Card, OverlayTrigger, Popover } from 'react-bootstrap'
import { ChatSquare } from 'react-bootstrap-icons'
import Label from 'components/label'
import Rate from 'components/rate'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'
import { Link } from 'react-router-dom'
import { deleteEntity } from 'store/entities/service'

type Props = {
    card: ICard;
    mutationState: MutationState;
    extend?: boolean;
}

const CardItemCompact = (props: Props) => {
    const {
        card,
        mutationState,
        extend = false
    } = props
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
    } = card

    const dispatch = useDispatch()
    const { faves = [] } = useSelector((state: IGlobalState) => state.auth.current!)
    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        switch (mutationState) {
            case 'delete':
                e.preventDefault()
                dispatch(deleteEntity('cards', id))
        }
    }
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
    const triggers = (() => {
        switch (mutationState) {
            case 'delete':
                // FIXME: old []
                return ["hover", "focus"]
            default:
                return ["hover", "focus"]
        }
    })()
    const className = (() => {
        switch (mutationState) {
            case 'delete':
                return 'btn-outline-danger'
            default:
                return 'btn-outline-secondary'
        }
    })()

    return (
        <Card className={cn("card-item-compact", "w-400", className, { "border border-warning": faves.includes(id) })}>
            <Link to={`/cards/${id}`} className='card-link' onClick={onClick}>
                <OverlayTrigger
                    // @ts-ignore
                    trigger={triggers}
                    placement="bottom"
                    overlay={popover}
                >
                    <Card.Body className='title'>{name}</Card.Body>
                </OverlayTrigger>
                {extend && (
                    <Card.Footer>
                        {dashboard.name}/{list.name}
                        <span className='float-right'>{author.username}</span>
                    </Card.Footer>
                )}
            </Link>
        </Card >
    )
}

export default CardItemCompact
