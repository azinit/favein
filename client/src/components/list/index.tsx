import React from 'react'
import { CardDeck, Button, Card } from 'react-bootstrap'
import CardItemCompact from 'components/card/item-compact'
import './index.scss'

type Props = {
    list: IList;
    cards: ICard[];
}

const List = (props: Props) => {
    const { cards, list } = props
    const { description, name } = list;
    // FIXME: temp
    const tcards = [...cards, ...cards, ...cards]
    // TODO: by Carousel?
    return (
        <div className="list bg-light rounded-lg">
            <h4>{name}</h4>
            {description && <p>{description}</p>}
            <div className="cards-list d-flex" style={{ overflow: 'auto' }}>
                {tcards.map(card => (
                    <CardItemCompact
                        key={Math.ceil(Math.random() * 1024)}
                        card={card}
                    />
                ))}
                {(cards.length === 0) && (
                    <Button
                        className='card new-card w-400'
                        variant="outline-info"
                    >
                        + Card
                    </Button>
                )}
            </div>
        </div>
    )
}

export default List
