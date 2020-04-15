import React from 'react'
import CardItem from '../card/item'
import './index.scss'

type Props = {
    list: IList;
    cards: ICard[];
}

const List = (props: Props) => {
    const { cards, list } = props
    const { author, dashboard, description, name } = list;
    const tcards = [...cards, ...cards, ...cards, ...cards, ...cards, ...cards]
    // TODO: by Carousel?
    return (
        <div className="list">
            <h2>{name}</h2>
            <div className="cards-list d-flex" style={{ overflow: 'auto' }}>
                {tcards.map(card => (
                    <CardItem
                        key={card.id}
                        card={card}
                    />
                    // <div className="card-container bg-secondary p-4 mr-1" style={{ flex: "0 0 300px" }}>
                    // </div>
                ))}
                {(cards.length === 0) && <span className="btn btn-outline-info">+ Card</span>}
            </div>
        </div>
    )
}

export default List
