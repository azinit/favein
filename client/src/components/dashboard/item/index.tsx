import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dashboardsSlice } from 'store/entities'
import { deleteEntity } from 'store/entities/service'
import Input from 'components/input'
import DashboardActions from './dashboard-actions'
import './index.scss'

const { } = dashboardsSlice.actions
type Props = {
    dashboard: IDashboard;
    showAuthor?: boolean;
    showActions?: boolean;
}

const DashboardItem = (props: Props) => {
    const { dashboard, showAuthor = true, showActions = false } = props
    const { author, background, description, id, name } = dashboard
    const [state, setState] = useState<MutationState>("preview")
    const dispatch = useDispatch()

    const onChange: OnChange = (e) => {

    }
    const onEdit = () => {
        setState('edit')
        console.log('EDIT: impl')
    }
    const onCancel = () => {
        setState('edit')
    }

    const onDelete = () => {
        dispatch(deleteEntity('dashboards', id))
    }

    return (
        <Card className="dashboard dashboard-item" bg="dark" text="white">
            <Card.Img src={background} alt={`${author.username}/${name}`} />
            <Link to={`/dashboards/${id}`} className="dashboard-link">
                <Card.ImgOverlay>
                    <Card.Title>
                        <Input
                            name="name"
                            value={name}
                            onChange={onChange}
                            mutationState={state}
                        />
                    </Card.Title>
                    <Card.Text>
                        <Input
                            name="description"
                            value={description}
                            onChange={onChange}
                            mutationState={state}
                        />
                    </Card.Text>
                    {showAuthor && (
                        <Card.Text>{author.username}&nbsp;&lt;{author.email}&gt;</Card.Text>
                    )}
                </Card.ImgOverlay>
            </Link>
            {showActions && (
                <DashboardActions
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            )}
        </Card>
    )
}

export default DashboardItem
