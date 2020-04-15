import React from 'react'
import { Card as BCard } from 'react-bootstrap'
import List from '../list'
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
        <BCard className="dashboard" style={{ width: '100%' }}>
            <BCard.Body>
                <BCard.Title className="text-center">{name}</BCard.Title>
                <BCard.Subtitle className="text-secondary text-center mb-4">{author.username} ({author.email})</BCard.Subtitle>
                <BCard.Text>
                    {description &&
                        <div className="summary mb-4 border border-secondary rounded p-4">
                            {description}
                        </div>
                    }
                    <BCard.Img src={background} alt="Dashboard background" className="background" height={200}/>
                    {lists.filter(l => l.dashboard.id == id).map(l => (
                        <List
                            key={l.id}
                            list={l}
                            cards={cards.filter(c => c.list.id === l.id)}
                        />
                    ))}
                </BCard.Text>
            </BCard.Body>
        </BCard>
    )
}

export default Dashboard
