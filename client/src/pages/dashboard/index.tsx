import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Dashboard from 'components/dashboard'
import Header from 'components/header'
import './index.scss'
import { readEntities } from 'store/entities/service'
import Loader from 'components/loader'
import Page404 from 'pages/errors/404'

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
    const [_loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(readEntities('dashboards'))
        dispatch(readEntities('lists'))
        dispatch(readEntities('cards'))
        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, [dispatch])

    // FIXME: load manually
    const dashboard = dashboards.entities.find(d => d.id === +id)

    if (loading || _loading) {
        return <Loader className='overlay' />
    }
    if (dashboard === undefined) {
        return <Page404 message="Такой доски не существует" />
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
