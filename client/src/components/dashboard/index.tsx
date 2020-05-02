import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import List from 'components/list'
import './index.scss'

type Props = {
    dashboard: IDashboard;
    lists: IList[];
    cards: ICard[];
}

const Dashboard = (props: Props) => {
    const { dashboard, lists, cards } = props
    const { author, background, description, id, name } = dashboard
    return (
        <div className="dashboard">
            <Card
                className="dashboard-preview border-0 rounded-0"
                text="white"
            >
                <Card.Img
                    className="background rounded-0"
                    src={background}
                    height={400}
                    alt="Dashboard background"
                />
                <Card.ImgOverlay className='darken dashboard-preview-overlay'>
                    <h1>{name}</h1>
                    {/* <Card.Title className="text-center">{name}</Card.Title> */}
                    <Badge variant="dark">{author.username} &lt;{author.email}&gt;</Badge>
                    {/* <Card.Subtitle className="text-secondary text-center mb-4"></Card.Subtitle> */}
                    {description && (
                        <Card.Text className='mt-3 description'>
                            {description}
                        </Card.Text>
                    )}
                </Card.ImgOverlay>
            </Card>
            <div className="dashboard-content">
                {lists.filter(l => l.dashboard.id === id).map(l => (
                    <List
                        key={l.id}
                        list={l}
                        cards={cards.filter(c => c.list.id === l.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dashboard
