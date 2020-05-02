import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CardSheet from 'components/card/sheet'
import Header from 'components/header'
import './index.scss'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const CardPage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const { cards } = useSelector((state: IGlobalState) => state.shared.entities)

    const card = cards.find(d => d.id === +id)

    if (card === undefined) {
        return <div>Такой карточки не существует</div>
    }

    return (
        <div className="page page-card">
            <Header />
            <CardSheet
                card={card}
            />
        </div>
    )
}

export default CardPage
