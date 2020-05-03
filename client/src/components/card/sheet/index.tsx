import React from 'react'
import { Card, Breadcrumb, Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Label from 'components/label/mutable'
import Comment from 'components/comment'
import Rate from 'components/rate'
import Markdown from 'components/markdown'
import { ChatSquare, PersonFill } from 'react-bootstrap-icons'
import './index.scss'
import CardActions from './actions'
import CommentForm from './comment-form'

type Props = {
    card: ICard;
}

const CardSheet = (props: Props) => {
    const {
        author,
        content,
        comments,
        dashboard,
        description,
        id,
        labels,
        list,
        name,
        rates
    } = props.card
    const dashboardLink = `/dashboards/${dashboard.id}`
    const listLink = `${dashboardLink}#list-${list.id}`

    const [mutationState, setMutationState] = React.useState<MutationState>('preview')

    const { current } = useSelector((state: IGlobalState) => state.auth)
    const totalLabels = useSelector((state: IGlobalState) => state.labels.entities)
    const relatedLabeldIds = labels.map(l => l.id)
    const visibleLabels = (mutationState === 'edit') ? totalLabels : labels

    const isCurrentUser = current.id === author.id
    const rate = {
        author: {},
        id: -1,
        value: (!rates.length) ? 0 : Math.ceil(rates.map(r => r.value).reduce((a, b) => a + b) / rates.length)
    } as IRate
    const ActionsView = isCurrentUser && <CardActions mutationState={mutationState} setMutationState={setMutationState} />

    return (
        <Card className="card-sheet shadow-lg">
            <Breadcrumb>
                <Breadcrumb.Item href={dashboardLink}>{dashboard.name}</Breadcrumb.Item>
                <Breadcrumb.Item href={listLink}>{list.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                {ActionsView}
            </Breadcrumb>
            <Card.Body>
                <Card.Title className="text-center">{name}</Card.Title>
                <Card.Subtitle className="text-secondary text-center mb-2">{author.username} ({author.email})</Card.Subtitle>
                <section className="text-center">
                    <a className='link-reset' href="#comments">{comments.length}&nbsp;<ChatSquare /></a>
                    &nbsp;
                    &nbsp;
                    <a className='link-reset' href="#rates">{rates.length}<PersonFill /></a>
                </section>
                <section>
                    {labels && (
                        <div className="labels d-flex justify-content-center flex-wrap">
                            {visibleLabels.map(l => (
                                <Label
                                    key={l.id}
                                    label={l}
                                    mutationState={mutationState}
                                    isRelated={relatedLabeldIds.includes(l.id)}
                                />
                            ))}
                        </div>
                    )}
                    {description && (
                        <Alert variant="info">
                            {description}
                        </Alert>
                    )}
                </section>
                <hr />
                <section className="card-content">
                    <div className="content mb-4">
                        <Markdown source={content} />
                    </div>
                </section>
                <hr />
                <section className="social-block">
                    <div className="rates">
                        <h4 id="rates">Social rate</h4>
                        <div className='d-flex align-items-center'>
                            <Rate rate={rate} showAuthor={false} />
                            {rates.length ? (
                                <div className='text-muted'>({rates.length}<PersonFill />)</div>
                            ) : (
                                    <span className='text-muted'>Be first!</span>
                                )}
                        </div>
                    </div>
                    <hr />
                    <div className="comments">
                        <h4 id="comments" className="mb-4">
                            Comments&nbsp;<span className="text-muted">{comments.length}</span>
                        </h4>
                        <div className="comment-form mb-4">
                            <CommentForm cardId={id} />
                        </div>
                        <div className='comments-list d-flex flex-wrap'>
                            {comments
                                .slice()
                                .sort((c1, c2) => new Date(c2.createdAt).getTime() - new Date(c1.createdAt).getTime())
                                .map(c => <Comment key={c.id} comment={c} />)
                            }
                        </div>
                    </div>
                </section>
            </Card.Body>
        </Card>
    )
}

export default CardSheet
