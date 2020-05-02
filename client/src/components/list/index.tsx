import React from 'react'
import CardItem from 'components/card/item'
import './index.scss'

type Props = {
    list: IList;
    cards: ICard[];
}

const List = (props: Props) => {
    const { cards, list } = props
    const { author, dashboard, description, name } = list;
    // FIXME: temp
    const tcards = [...cards, ...cards, ...cards]
    // TODO: by Carousel?
    return (
        <div className="list bg-light rounded-lg">
            <h4>{name}</h4>
            {description && <p>{description}</p>}
            <div className="cards-list d-flex" style={{ overflow: 'auto' }}>
                {tcards.map(card => (
                    <CardItem
                        key={card.id}
                        card={card}
                    />
                ))}
                {(cards.length === 0) && <span className="btn btn-outline-info">+ Card</span>}
            </div>
        </div>
    )
}

export default List
