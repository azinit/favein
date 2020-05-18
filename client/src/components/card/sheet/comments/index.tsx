import React from 'react'
import CommentForm from './comment-form'
import Comment from 'components/comment'
import { useSelector } from 'react-redux'

const Comments = () => {
    const { comments } = useSelector((state: IGlobalState) => state.cards.current!)
    return (
        <div className="comments">
            <h4 id="comments" className="mb-4">
                Comments&nbsp;<span className="text-muted">{comments.length}</span>
            </h4>
            <div className="comment-form mb-4">
                <CommentForm />
            </div>
            <div className='comments-list d-flex flex-wrap'>
                {comments
                    .slice()
                    .sort((c1, c2) => new Date(c2.createdAt).getTime() - new Date(c1.createdAt).getTime())
                    .map(c => <Comment key={c.id} comment={c} />)
                }
            </div>
        </div>
    )
}

export default Comments
