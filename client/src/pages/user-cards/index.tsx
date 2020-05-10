import React, { useEffect } from 'react'
import Header from 'components/header'
import { useSelector, useDispatch } from 'react-redux'
import CardItem from 'components/card/item-compact'
import { readEntities } from 'store/entities/service'
import './index.scss'

const UserCardsPage = () => {
    const { faves = [], id } = useSelector((state: IGlobalState) => state.auth.current!)
    const { entities = [] } = useSelector((state: IGlobalState) => state.cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readEntities('cards'))
    }, [dispatch])

    const contentRenderer = () => {
        if (faves.length === 0) {
            return (
                <div className='text-muted text-center'>Карточки <i>отсутствуют</i></div>
            )
        }

        return (
            <div className="faves-list d-flex flex-wrap">
                {entities.filter(e => e.author.id === id).map(fave => (
                    <CardItem
                        key={fave.id}
                        card={fave}
                        mutationState="preview"
                    />
                ))}
            </div>
        )
    }

    return (
        <div className='page page-user-cards'>
            <Header />
            <div className="body">
                <h1 className='text-center m-4'>Мои материалы</h1>
                <div className="container">
                    {contentRenderer()}
                </div>
            </div>

        </div>
    )
}

export default UserCardsPage
