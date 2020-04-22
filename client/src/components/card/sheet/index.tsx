import React from 'react'
import { Card as BCard, Breadcrumb } from 'react-bootstrap'
import Label from '../../label'
import Comment from '../../comment'
import Rate from '../../rate'

type Props = {
    card: ICard;
}

const CardSheet = (props: Props) => {
    const { author, content, comments, dashboard, description, id, labels, list, name, rates } = props.card
    return (
        <BCard className="card-sheet" style={{ width: '100%' }}>
            <Breadcrumb>
                <Breadcrumb.Item href="#">{dashboard.name}</Breadcrumb.Item>
                <Breadcrumb.Item href="#">{list.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </Breadcrumb>
            <BCard.Body>
                <BCard.Title className="text-center">{name}</BCard.Title>
                <BCard.Subtitle className="text-secondary text-center mb-4">{author.username} ({author.email})</BCard.Subtitle>
                <BCard.Text>
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
                            {content}
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
                </BCard.Text>
            </BCard.Body>
        </BCard>
    )
}

export default CardSheet
