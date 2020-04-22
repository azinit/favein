import React from 'react'
import { Card } from 'react-bootstrap'
import './index.scss'

type Props = {
    dashboard: IDashboard;
}

const DashboardItem = (props: Props) => {
    const { author, background, description, id, name } = props.dashboard
    return (
        <Card className="dashboard dashboard-item" bg="dark" text="white">
            <Card.Img src={background} alt={`${author.username}/${name}`} />
            <Card.ImgOverlay>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>{author.username}&nbsp;&lt;{author.email}&gt;</Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}

export default DashboardItem
