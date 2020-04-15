import React, { useEffect, useState } from 'react'
import DemoSection from './demo-section'
import Comment from '../../components/comment'
import API from '../../fetch'

const AdminPage = () => {
    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
        API.comments.readList()
            .then(response => {
                console.log(response)
                setComments(response.data)
            })
            .catch(console.error)
        API.comments.read(1)
            .then(response => {
                console.log(response)
            })
            .catch(console.error)
    }, [])
    return (
        <div>
            <DemoSection>
                <div>
                    Hello... its me...
                </div>
            </DemoSection>
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
        </div>
    )
}

export default AdminPage
