import React from 'react'
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
    const tcards = [...cards, ...cards, ...cards]
    const { current } = useSelector((state: IGlobalState) => state.shared.auth)
    const isCurrentUser = current.id !== author.id

    const placeholder = (() => {
        if (cards.length > 0) {
            return (null)
        }

        if (isCurrentUser) {
            return (
                <Button
                    className='card new-card w-400'
                    variant="outline-info"
                >
                    + Card
                </Button>
            )
        }

        return (
            <div className='text-muted'>(empty)</div>
        )
    })()

    return (
        <div
            className="list bg-light rounded-lg"
            id={`list-${id}`}
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
                {placeholder}
            </div>
        </div>
    )
}

export default List
