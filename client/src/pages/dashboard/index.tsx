import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Dashboard from 'components/dashboard'
import Header from 'components/header'
import './index.scss'
import { readEntities } from 'store/entities/service'
import Loader from 'components/loader'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const DashboardPage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const { dashboards, lists, cards } = useSelector((state: IGlobalState) => state)
    const dispatch = useDispatch()
    const { loading = true } = dashboards
    useEffect(() => {
        dispatch(readEntities('dashboards'))
        dispatch(readEntities('lists'))
        dispatch(readEntities('cards'))
    }, [dispatch])

    // FIXME: load manually
    const dashboard = dashboards.entities.find(d => d.id === +id)

    if (loading) {
        return <Loader className='overlay' />
    }
    if (dashboard === undefined) {
        return <div>Такой доски не существует</div>
    }

    return (
        <div className="page page-dashboard">
            <Header />
            <Dashboard
                dashboard={dashboard}
                lists={lists.entities}
                cards={cards.entities}
            />
        </div>
    )
}

export default DashboardPage
