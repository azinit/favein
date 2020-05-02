import React from 'react'
import { Card, Breadcrumb, Alert } from 'react-bootstrap'
import Label from 'components/label'
import Comment from 'components/comment'
import Rate from 'components/rate'
import Markdown from 'components/markdown'
import './index.scss'

type Props = {
    card: ICard;
}

const CardSheet = (props: Props) => {
    const { author, content, comments, dashboard, description, id, labels, list, name, rates } = props.card
    const dashboardLink = `/dashboards/${dashboard.id}`
    const listLink = `${dashboardLink}#list-${list.id}`
    return (
        <Card className="card-sheet">
            <Breadcrumb>
                <Breadcrumb.Item href={dashboardLink}>{dashboard.name}</Breadcrumb.Item>
                <Breadcrumb.Item href={listLink}>{list.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </Breadcrumb>
            <Card.Body>
                <Card.Title className="text-center">{name}</Card.Title>
                <Card.Subtitle className="text-secondary text-center mb-4">{author.username} ({author.email})</Card.Subtitle>
                <Card.Text>
                    <div>
                        {labels && (
                            <div className="labels d-flex justify-content-center mb-4">
                                {labels.map(l => <Label key={l.id} label={l} />)}
                            </div>
                        )}
                        {description && (
                            <Alert variant="info">
                                {description}
                            </Alert>
                        )}
                        <div className="content mb-4">
                            <Markdown source={content} />
                        </div>
                        {rates && (
                            <div className="rates d-flex mb-4">
                                {rates.map(r => <Rate key={r.id} rate={r} />)}
                            </div>
                        )}
                        {comments && (
                            <div className="comments d-flex">
                                {comments.map(c => <Comment key={c.id} comment={c} />)}
                            </div>
                        )}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardSheet
