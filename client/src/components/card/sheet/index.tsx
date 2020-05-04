import React from 'react'
import { Card, Breadcrumb } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Header from './header'
import CardActions from './actions'
import Comments from './comments'
import Rates from './rates'
import './index.scss'
import Content from './content'

// FIXME: useSelector.current instead
type Props = {
    card: ICard;
}

const CardSheet = (props: Props) => {
    const {
        name, content,
        dashboard, list, author
    } = props.card
    const dashboardLink = `/dashboards/${dashboard.id}`
    const listLink = `${dashboardLink}#list-${list.id}`

    const [mutationState, setMutationState] = React.useState<MutationState>('preview')
    const mutationConfig = { mutationState, setMutationState }
    const isCurrentUser = useSelector((state: IGlobalState) => state.auth.current.id === author.id)

    // views
    const ActionsView = isCurrentUser && <CardActions {...mutationConfig} />
    return (
        <Card className="card-sheet shadow-lg">
            <Breadcrumb>
                <Breadcrumb.Item href={dashboardLink}>{dashboard.name}</Breadcrumb.Item>
                <Breadcrumb.Item href={listLink}>{list.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                {ActionsView}
            </Breadcrumb>
            <Card.Body>
                <Header {...mutationConfig} />
                <section className="card-content">
                    <Content {...mutationConfig} />
                </section>
                <hr />
                <section className="social-block">
                    <Rates />
                    <hr />
                    <Comments />
                </section>
            </Card.Body>
        </Card>
    )
}

export default CardSheet
