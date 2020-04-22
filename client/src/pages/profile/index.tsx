import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Card, Jumbotron, Tabs, Tab } from 'react-bootstrap'
import { fetchAll } from 'fetch'
import Loader from 'components/loader'
import User from 'components/user'
import Dashboard from 'components/dashboard'

type Params = {
    id: string;
}

type Props = RouteComponentProps<Params> & {
}

const ProfilePage = (props: Props) => {
    const { match } = props
    const { params: { id } } = match;
    const [state, setState] = useState<Partial<TotalData>>({})
    const [loading, setLoading] = useState(true)
    const {
        comments = [],
        rates = [],
        labels = [],
        users = [],
        cards = [],
        lists = [],
        dashboards = []
    } = state;

    const user = users.find(u => u.id === +id)
    const userDashboards = dashboards.filter(d => d.author.id === +id)

    useEffect(() => {
        fetchAll().then(r => setState(r))
        setLoading(false)
    }, [])

    if (loading) {
        return <Loader className="overlay" />
    }

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

export default ProfilePage
