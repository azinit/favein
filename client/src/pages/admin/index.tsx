import React, { useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DemoSection from './demo-section'
import Comment from 'components/comment'
import Rate from 'components/rate'
import Label from 'components/label'
import User from 'components/user'
import CardSheet from 'components/card/sheet'
import List from 'components/list'
import Dashboard from 'components/dashboard'
import Header from 'components/header'
import { readAllEntities } from 'store/entities/service'
import Loader from 'components/loader'

type Props = {
}

const AdminPage = (props: Props) => {
    const { cards, comments, dashboards, labels, lists, rates, users } = useSelector((state: IGlobalState) => state)
    const dispatch = useDispatch()
    
    const loading = [cards, comments, dashboards, labels, lists, rates, users].some(model => model.loading)

    useEffect(() => {
        dispatch(readAllEntities())
    }, [dispatch])

    if (loading) {
        return <Loader className='overlay' />
    }

    return (
        <div className='page page-admin'>
            <Header />
            <DemoSection title="Comments">
                {comments.entities.map(comment => <Comment key={comment.id} comment={comment} />)}
            </DemoSection>
            <DemoSection title="Rates">
                {rates.entities.map(rate => <Rate key={rate.id} rate={rate} />)}
            </DemoSection>
            <DemoSection title="Labels">
                {labels.entities.map(label => <Label key={label.id} label={label} />)}
            </DemoSection>
            <DemoSection title="Users">
                {users.entities.map(user => <User key={user.id} user={user} />)}
            </DemoSection>
            <DemoSection title="Cards Sheets" className="flex-wrap">
                {cards.entities.slice(1, 4).map(card => <CardSheet key={card.id} card={card} />)}
            </DemoSection>
            <DemoSection title="Lists" className="flex-wrap">
                {lists.entities.slice(1, 4).map(list => (
                    <List
                        key={list.id}
                        list={list}
                        cards={cards.entities.filter(c => c.list.id === list.id)}
                    />
                ))}
            </DemoSection>
            <DemoSection title="Dashboards" className="flex-column w-100">
                <Tabs id="profile-dashboards-tabs">
                    {dashboards.entities.map(dashboard => (
                        <Tab eventKey={dashboard.id} title={dashboard.name}>
                            <Dashboard
                                dashboard={dashboard}
                                lists={lists.entities}
                                cards={cards.entities}
                            />
                        </Tab>
                    ))}
                </Tabs>
            </DemoSection>
        </div>
    )
}

export default AdminPage
