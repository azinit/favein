import React from 'react'
import Header from 'components/header'
import { useSelector } from 'react-redux'
import CardItem from 'components/card/item'

const FavesPage = () => {
    const { faves = [] } = useSelector((state: IGlobalState) => state.auth.current!)
    return (
        <div className='page page-faves'>
            <Header />
            <div className="body">
                <h1 className='text-center m-4'>Избранные карточки</h1>
                <div className="faves-list">
                    {faves.map(fave => (
                        <CardItem key={fave.id} card={fave} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default FavesPage
