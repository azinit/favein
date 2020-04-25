import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './index.scss'
import DashboardActions from './dashboard-actions'

type Props = {
    dashboard: IDashboard;
    showAuthor?: boolean;
    showActions?: boolean;
}

const DashboardItem = (props: Props) => {
    const { dashboard, showAuthor = true, showActions = false } = props
    const { author, background, description, id, name } = dashboard
    return (
        <Card className="dashboard dashboard-item" bg="dark" text="white">
            <Card.Img src={background} alt={`${author.username}/${name}`} />
            <Link to={`/dashboards/${id}`} className="dashboard-link">
                <Card.ImgOverlay>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    {showAuthor && (
                        <Card.Text>{author.username}&nbsp;&lt;{author.email}&gt;</Card.Text>
                    )}
                </Card.ImgOverlay>
            </Link>
            {showActions && <DashboardActions />}
        </Card>
    )
}

export default DashboardItem
