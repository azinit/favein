import React from 'react'
import { Card as BCard, Breadcrumb } from 'react-bootstrap'
type Props = {
    card: ICard;
}

const Card = (props: Props) => {
    const { author, content, comments, dashboard, description, id, labels, list, name, rates } = props.card
    return (
        <BCard className="fave-card" style={{ width: '100%' }}>
            <Breadcrumb>
                <Breadcrumb.Item href="#">{dashboard.name}</Breadcrumb.Item>
                <Breadcrumb.Item href="#">{list.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
            </Breadcrumb>
            <BCard.Body>
                <BCard.Title className="text-center">{name}</BCard.Title>
                <BCard.Subtitle className="text-secondary text-center mb-4">{author.username} ({author.email})</BCard.Subtitle>
                <BCard.Text>
                    {description &&
                        <div className="summary mb-4 border border-secondary p-4">
                            {description}
                        </div>
                    }
                    <div className="content">
                        {content}
                    </div>
                </BCard.Text>
            </BCard.Body>
        </BCard>
    )
}

export default Card
