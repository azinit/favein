import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Jumbotron, CardDeck, Container } from 'react-bootstrap'
import Header from 'components/header'
import AddDashboard from 'components/dashboard/add'
import DashboardItem from 'components/dashboard/item'
import './index.scss'
import { readEntities } from 'store/entities/service'
import Page404 from 'pages/errors/404'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const UserPage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const { users, dashboards } = useSelector((state: IGlobalState) => state)
    const { current } = useSelector((state: IGlobalState) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readEntities('dashboards'))
        dispatch(readEntities('users'))
    }, [dispatch])

    const user = users.entities.find(u => u.id === +id)
    const userDashboards = dashboards.entities.filter(d => d.author.id === +id)
    const isCurrentUser = current.id === +id

    if (user === undefined) {
        return <Page404 message="Такого пользователя не существует" />
    }

    return (
        <div className="page page-user">
            <Header />
            <Jumbotron className="bg-white p-0 mt-4">
                <h1 className="text-center">{user.username}'s dashboards</h1>
            </Jumbotron>
            <Jumbotron className="bg-white p-2">
                <Container>
                    <CardDeck className="justify-content-center">
                        {userDashboards.map(dashboard => (
                            <DashboardItem
                                key={dashboard.id}
                                dashboard={dashboard}
                                showAuthor={false}
                                showActions={isCurrentUser}
                            />
                        ))}
                        {(userDashboards.length === 0) && <div>У пользователя нет еще ни одного дашборда</div>}
                        {isCurrentUser && <AddDashboard />}
                    </CardDeck>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default UserPage
