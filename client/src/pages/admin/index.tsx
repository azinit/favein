import React, { useEffect, useState } from 'react'
import DemoSection from './demo-section'
import Comment from '../../components/comment'
import Rate from '../../components/rate'
import Label from '../../components/label'
import User from '../../components/user'
import CardSheet from '../../components/card/sheet'
import List from '../../components/list'
import API from '../../fetch'

const AdminPage = () => {
    const [comments, setComments] = useState<IComment[]>([])
    const [rates, setRates] = useState<IRate[]>([])
    const [labels, setLabels] = useState<ILabel[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [cards, setCards] = useState<ICard[]>([])
    const [lists, setLists] = useState<IList[]>([])

    useEffect(() => {
        API.comments.readList().then(response => setComments(response.data))
        API.rates.readList().then(response => setRates(response.data))
        API.labels.readList().then(response => setLabels(response.data))
        API.users.readList().then(response => setUsers(response.data))
        API.cards.readList().then(response => setCards(response.data))
        API.lists.readList().then(response => setLists(response.data))
    }, [])
    return (
        <div>
            <DemoSection title="Comments">
                {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </DemoSection>
            <DemoSection title="Rates">
                {rates.map(rate => <Rate key={rate.id} rate={rate} />)}
            </DemoSection>
            <DemoSection title="Labels">
                {labels.map(label => <Label key={label.id} label={label} />)}
            </DemoSection>
            <DemoSection title="Users">
                {users.map(user => <User key={user.id} user={user} />)}
            </DemoSection>
            <DemoSection title="Cards Sheets" className="flex-wrap">
                {cards.map(card => <CardSheet key={card.id} card={card} />)}
            </DemoSection>
            <DemoSection title="Lists" className="flex-wrap">
                {lists.slice(2, 4).map(list => (
                    <List
                        key={list.id}
                        list={list}
                        cards={cards.filter(c => c.list.id == list.id)}
                    />
                ))}
            </DemoSection>
        </div>
    )
}

export default AdminPage
