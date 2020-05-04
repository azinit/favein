import React, { MouseEvent } from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import CardItemCompact from 'components/card/item-compact'
import './index.scss'
import AddCard from 'components/card/add'
import { deleteEntity } from 'store/entities/service'

type Props = {
    list: IList;
    cards: ICard[];
}

const List = (props: Props) => {
    const { cards, list } = props
    const { description, name, author, id } = list;
    const { current } = useSelector((state: IGlobalState) => state.auth)
    const { mutationState } = useSelector((state: IGlobalState) => state.lists)
    const dispatch = useDispatch()
    const isDeleting = mutationState === 'delete'
    const isCurrentUser = current.id === author.id

    const ActionsView = isCurrentUser && !isDeleting && <AddCard listId={id} />
    const listHash = `list-${id}`;
    const pageHash = window.location.hash.substr(1)
    const isSelected = pageHash === listHash
    const showPlaceholder = cards.length === 0 && !isCurrentUser

    const label = (() => {
        switch (mutationState) {
            case 'delete':
                return <span>{name} <span className='text-muted'>(delete mode)</span></span>
            default:
                return name
        }
    })()

    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        switch (mutationState) {
            case 'delete':
                e.preventDefault()
                // TODO: forceDelete on server (with cards)
                dispatch(deleteEntity('lists', id))
        }
    }

    return (
        <div
            className={cn(
                "list",
                "rounded-lg",
                'bg-light',
                'shadow',
                { 'border border-secondary': isSelected },
                { 'border border-danger': isDeleting }
            )}
            id={listHash}
        >
            <a className='title h4' href={`#list-${id}`} onClick={onClick} >{label}</a>
            {description && <p>{description}</p>}
            <div className="cards-list d-flex mt-2" style={{ overflow: 'auto' }}>
                {cards.map(card => (
                    <CardItemCompact
                        key={Math.ceil(Math.random() * 1024)}
                        card={card}
                        mutationState={mutationState}
                    />
                ))}
                {ActionsView}
                {showPlaceholder && <div className='text-muted'>(empty)</div>}
            </div>
        </div >
    )
}

export default List
