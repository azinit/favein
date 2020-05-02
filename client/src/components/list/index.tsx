import React from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { CardDeck, Button, Card } from 'react-bootstrap'
import CardItemCompact from 'components/card/item-compact'
import './index.scss'

type Props = {
    list: IList;
    cards: ICard[];
}

const List = (props: Props) => {
    const { cards, list } = props
    const { description, name, author, id } = list;
    // FIXME: temp
    const tcards = [...cards]
    const { current } = useSelector((state: IGlobalState) => state.shared.auth)
    const isCurrentUser = current.id !== author.id

    const ActionsView = isCurrentUser && (
        <Button
            className='card new-card w-400'
            variant="outline-info"
        >
            + Card
        </Button>
    )
    const listHash = `list-${id}`;
    const pageHash = window.location.hash.substr(1)
    const isSelected = pageHash === listHash
    const showPlaceholder = cards.length === 0 && !isCurrentUser

    return (
        <div
            className={cn(
                "list",
                "rounded-lg",
                'bg-light',
                { 'border border-secondary': isSelected }
            )}
            id={listHash}
        >
            <a className='title h4' href={`#list-${id}`}>{name}</a>
            {description && <p>{description}</p>}
            <div className="cards-list d-flex" style={{ overflow: 'auto' }}>
                {tcards.map(card => (
                    <CardItemCompact
                        key={Math.ceil(Math.random() * 1024)}
                        card={card}
                    />
                ))}
                {ActionsView}
                {showPlaceholder && <div className='text-muted'>(empty)</div>}
            </div>
        </div>
    )
}

export default List
