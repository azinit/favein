import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './index.scss'

type Props = {
    dashboard: IDashboard;
    showAuthor?: boolean;
}

const DashboardItem = (props: Props) => {
    const { dashboard, showAuthor = true } = props
    const { author, background, description, id, name } = dashboard
    return (
        <Link to={`/dashboards/${id}`}>
            <Card className="dashboard dashboard-item" bg="dark" text="white">
                <Card.Img src={background} alt={`${author.username}/${name}`} />
                <Card.ImgOverlay>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    {showAuthor && (
                        <Card.Text>{author.username}&nbsp;&lt;{author.email}&gt;</Card.Text>
                    )}
                </Card.ImgOverlay>
            </Card>
        </Link>
    )
}

export default DashboardItem
