import React from 'react'
import { Card, Breadcrumb, Alert } from 'react-bootstrap'
import Label from 'components/label'
import Comment from 'components/comment'
import Rate from 'components/rate'
import Markdown from 'components/markdown'
import { ChatSquare, PersonFill } from 'react-bootstrap-icons'
import './index.scss'

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
        // id,
        labels,
        list,
        name,
        rates
    } = props.card
    const dashboardLink = `/dashboards/${dashboard.id}`
    const listLink = `${dashboardLink}#list-${list.id}`
    const rate = {
        author: {},
        id: -1,
        value: (!rates.length) ? 0 : Math.ceil(rates.map(r => r.value).reduce((a, b) => a + b) / rates.length)
    } as IRate

    return (
        <Card className="card-sheet shadow-lg">
            <Breadcrumb>
                <Breadcrumb.Item href={dashboardLink}>{dashboard.name}</Breadcrumb.Item>
                <Breadcrumb.Item href={listLink}>{list.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
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
                        <div className="labels d-flex justify-content-center">
                            {labels.map(l => <Label key={l.id} label={l} />)}
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
                        <h4 id="comments">
                            Comments&nbsp;
                                <span className="text-muted">{comments.length}</span>
                        </h4>
                        <div className='comments-list d-flex'>
                            {comments.map(c => <Comment key={c.id} comment={c} />)}
                        </div>
                    </div>
                </section>
            </Card.Body>
        </Card>
    )
}

export default CardSheet
