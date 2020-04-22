import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Jumbotron, Tabs, Tab } from 'react-bootstrap'
import Dashboard from 'components/dashboard'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const UserPage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const { users, dashboards, lists, cards } = useSelector((state: IGlobalState) => state.shared)

    const user = users.find(u => u.id === +id)
    const userDashboards = dashboards.filter(d => d.author.id === +id)

    if (user === undefined) {
        return <div>Такого пользователя не существует</div>
    }
    return (
        <Jumbotron className="bg-white">
            <Card>
                <h1 className="text-center">{user.username}'s dashboards</h1>
                <Card.Body>
                    <Tabs id="dashboards-tabs">
                        {userDashboards.map(dashboard => (
                            <Tab key={dashboard.id} eventKey={dashboard.id} title={dashboard.name}>
                                <Dashboard
                                    dashboard={dashboard}
                                    lists={lists}
                                    cards={cards}
                                />
                            </Tab>
                        ))}
                    </Tabs>
                    {(userDashboards.length === 0) && <div>У пользователя нет еще ни одного дашборда</div>}
                </Card.Body>
            </Card>
        </Jumbotron>
    )
}

export default UserPage
