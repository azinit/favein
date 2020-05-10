import React from 'react'
import { Card, Breadcrumb } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Header from './header'
import CardActions from './actions'
import Comments from './comments'
import Rates from './rates'
import './index.scss'
import Content from './content'
import { updateEntity, getActions } from 'store/entities/service'

const { resetDTODetails, setMutationState } = getActions('cards')
// FIXME: useSelector.current instead
type Props = {
    card: ICard;
}

const CardSheet = (props: Props) => {
    const { name, dashboard, list, author, id } = props.card
    const dashboardLink = `/dashboards/${dashboard.id}`
    const listLink = `${dashboardLink}#list-${list.id}`

    const { current } = useSelector((state: IGlobalState) => state.auth)
    const isCurrentUser = current!.id === author.id
    const dispatch = useDispatch()

    const onSave = () => {
        dispatch(updateEntity('cards'))
        dispatch(setMutationState('preview'))
    }
    const onCancel = () => {
        dispatch(resetDTODetails())
        dispatch(setMutationState('preview'))
    }

    const mutationConfig = { onSave, onCancel, id }

    // views
    const ActionsView = isCurrentUser && <CardActions {...mutationConfig} isFaved={current!.faves.includes(id)} />
    return (
        <Card className="card-sheet shadow-lg">
            <Breadcrumb>
                <Breadcrumb.Item href={dashboardLink}>{dashboard.name}</Breadcrumb.Item>
                <Breadcrumb.Item href={listLink}>{list.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                {ActionsView}
            </Breadcrumb>
            <Card.Body>
                <Header />
                <section className="card-content">
                    <Content />
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
