import React from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import CardItemCompact from 'components/card/item-compact'
import './index.scss'
import AddCard from 'components/card/add'

type Props = {
    list: IList;
    cards: ICard[];
}

const List = (props: Props) => {
    const { cards, list } = props
    const { description, name, author, id } = list;
    const { current } = useSelector((state: IGlobalState) => state.auth)
    const isCurrentUser = current.id !== author.id

    const ActionsView = isCurrentUser && <AddCard listId={id} />
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
                'shadow',
                { 'border border-secondary': isSelected }
            )}
            id={listHash}
        >
            <a className='title h4' href={`#list-${id}`}>{name}</a>
            {description && <p>{description}</p>}
            <div className="cards-list d-flex mt-2" style={{ overflow: 'auto' }}>
                {cards.map(card => (
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
