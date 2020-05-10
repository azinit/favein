import React, { useEffect } from 'react'
import Header from 'components/header'
import { useSelector, useDispatch } from 'react-redux'
import CardItem from 'components/card/item-compact'
import { readEntities } from 'store/entities/service'
import './index.scss'

const FavesPage = () => {
    const { faves = [] } = useSelector((state: IGlobalState) => state.auth.current!)
    const { entities = [] } = useSelector((state: IGlobalState) => state.cards)
    const disptach = useDispatch()

    useEffect(() => {
        disptach(readEntities('cards'))
    }, [])

    const contentRenderer = () => {
        if (entities.length === 0) {
            return (
                <div className='text-muted'>Отсутствуют избранные карточки</div>
            )
        }

        return (
            <div className="faves-list d-flex flex-wrap">
                {entities.filter(e => faves.includes(e.id)).map(fave => (
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
        <div className='page page-faves'>
            <Header />
            <div className="body">
                <h1 className='text-center m-4'>Избранные карточки</h1>
                <div className="container">
                    {contentRenderer()}
                </div>
            </div>

        </div>
    )
}

export default FavesPage
