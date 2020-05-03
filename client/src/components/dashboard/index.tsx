import React from 'react'
import { Card, Button } from 'react-bootstrap'
import List from 'components/list'
import { useSelector, useDispatch } from 'react-redux'
import './index.scss'
import { Trash, X } from 'react-bootstrap-icons'
import { getActions } from 'store/entities/service'

type Props = {
    dashboard: IDashboard;
    lists: IList[];
    cards: ICard[];
}

const Dashboard = (props: Props) => {
    const { dashboard, lists, cards } = props
    const { author, background, description, id, name } = dashboard
    const { current } = useSelector((state: IGlobalState) => state.auth)
    const { mutationState } = useSelector((state: IGlobalState) => state.lists)
    const dispatch = useDispatch()
    const { setMutationState } = getActions('lists')
    const isCurrentUser = current.id === author.id

    const toolbar = (
        <section className="toolbar text-center">
            {mutationState === 'preview' && (
                <Button
                    block
                    variant="outline-danger"
                    className='rounded-0'
                    onClick={() => {
                        console.log('=> DeleteMode')
                        dispatch(setMutationState('delete'))
                    }}
                >
                    <Trash />
                </Button>
            )}
            {mutationState === 'delete' && (
                <Button
                    block
                    variant="outline-secondary"
                    className='rounded-0'
                    onClick={() => {
                        console.log('=> PreviewMode')
                        dispatch(setMutationState('preview'))
                    }}
                >
                    <X />
                </Button>
            )}
        </section>
    )

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
                    <a
                        href={`/users/${author.id}`}
                        className='btn btn-dark btn-sm rounded-pill px-4'
                    >
                        {author.username} &lt;{author.email}&gt;
                    </a>
                    {/* <Card.Subtitle className="text-secondary text-center mb-4"></Card.Subtitle> */}
                    {description && (
                        <Card.Text className='mt-3 description'>
                            {description}
                        </Card.Text>
                    )}
                </Card.ImgOverlay>
            </Card>
            {isCurrentUser && toolbar}
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
