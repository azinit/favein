import React from 'react'
import { Card, Breadcrumb } from 'react-bootstrap'
import Label from 'components/label'
import Comment from 'components/comment'
import Rate from 'components/rate'
import ReactMarkdown from 'react-markdown'
import CodeRenderer from 'components/code-renderer'
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
                            <div className="summary mb-4 border border-secondary rounded p-4">
                                {description}
                            </div>
                        )}
                        <div className="content mb-4">
                            <ReactMarkdown 
                                source={content}
                                renderers={{ code: CodeRenderer }}
                            />
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
