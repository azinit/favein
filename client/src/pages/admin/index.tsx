import React, { useEffect, useState } from 'react'
import DemoSection from './demo-section'
import Comment from '../../components/comment'
import Rate from '../../components/rate'
import Label from '../../components/label'
import User from '../../components/user'
import API from '../../fetch'

const AdminPage = () => {
    const [comments, setComments] = useState<IComment[]>([])
    const [rates, setRates] = useState<IRate[]>([])
    const [labels, setLabels] = useState<ILabel[]>([])
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        API.comments.readList().then(response => setComments(response.data))
        API.rates.readList().then(response => setRates(response.data))
        API.labels.readList().then(response => setLabels(response.data))
        API.users.readList().then(response => setUsers(response.data))
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
        </div>
    )
}

export default AdminPage
