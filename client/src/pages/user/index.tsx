import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Jumbotron, CardDeck, Container } from 'react-bootstrap'
import Dashboard from 'components/dashboard'
import DashboardItem from 'components/dashboard/item'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const UserPage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const { users, dashboards, lists, cards } = useSelector((state: IGlobalState) => state.shared.entries)

    const user = users.find(u => u.id === +id)
    const userDashboards = dashboards.filter(d => d.author.id === +id)

    if (user === undefined) {
        return <div>Такого пользователя не существует</div>
    }
    return (
        <div className="user-page">
            <Jumbotron className="bg-white p-0 mt-4">
                <h1 className="text-center">{user.username}'s dashboards</h1>
            </Jumbotron>
            <Jumbotron className="bg-white p-2">
                <Container>
                    <CardDeck className="justify-content-center">
                        {[...userDashboards, ...userDashboards, ...userDashboards, ...userDashboards, ...userDashboards].map(dashboard => (
                            <DashboardItem
                                dashboard={dashboard}
                            />
                        ))}
                        {(userDashboards.length === 0) && <div>У пользователя нет еще ни одного дашборда</div>}
                    </CardDeck>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default UserPage
