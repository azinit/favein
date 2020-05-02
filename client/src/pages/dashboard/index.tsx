import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from 'components/dashboard'
import Header from 'components/header'
import './index.scss'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const DashboardPage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const { dashboards, lists, cards } = useSelector((state: IGlobalState) => state.shared.entities)

    const dashboard = dashboards.find(d => d.id === +id)

    if (dashboard === undefined) {
        return <div>Такой доски не существует</div>
    }

    return (
        <div className="page page-dashboard">
            <Header />
            <Dashboard
                dashboard={dashboard}
                lists={lists}
                cards={cards}
            />
        </div>
    )
}

export default DashboardPage
