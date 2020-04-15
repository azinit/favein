import React, { useEffect, useState } from 'react'
import DemoSection from './demo-section'
import Comment from '../../components/comment'
import API from '../../fetch'
import Rate from '../../components/rate'

const AdminPage = () => {
    const [comments, setComments] = useState<IComment[]>([])
    const [rates, setRates] = useState<IRate[]>([])

    useEffect(() => {
        API.comments.readList()
            .then(response => {
                setComments(response.data)
            })
        API.rates.readList()
            .then(response => {
                setRates(response.data)
                console.log(response)
            })
    }, [])
    return (
        <div>
            <DemoSection title="Comments">
                <>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                        />
                    ))}
                </>
            </DemoSection>
            <DemoSection title="Rates">
                <>
                    {rates.map(rate => (
                        <Rate
                            key={rate.id}
                            rate={rate}
                        />
                    ))}
                </>
            </DemoSection>
        </div>
    )
}

export default AdminPage
