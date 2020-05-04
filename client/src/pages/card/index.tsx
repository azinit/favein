import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CardSheet from 'components/card/sheet'
import Header from 'components/header'
import './index.scss'
import { readEntities, getActions } from 'store/entities/service'
import Loader from 'components/loader'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const CardPage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const { entities, loading = true } = useSelector((state: IGlobalState) => state.cards)
    const { setCurrent, setMutationState, resetDTODetails } = getActions('cards')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readEntities('cards'))
        dispatch(readEntities('labels'))
        dispatch(setMutationState('preview'))
        dispatch(resetDTODetails())
    }, [dispatch])

    const card = entities.find(e => e.id === +id)
    if (card) {
        dispatch(setCurrent(card as any))
    }

    if (loading) {
        return <Loader className='overlay' />
    }
    if (card === undefined) {
        return <div>Такой карточки не существует</div>
    }
    return (
        <div className="page page-card">
            <Header />
            <CardSheet card={card} />
        </div>
    )
}

export default CardPage
