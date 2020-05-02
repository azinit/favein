import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardsSlice } from 'store/entities'
import { deleteEntity } from 'store/entities/service'
import TextField from 'components/text-field'
import DashboardActions from './dashboard-actions'
import './index.scss'

const { updateDTODetails } = dashboardsSlice.actions
type Props = {
    dashboard: IDashboard;
    showAuthor?: boolean;
    showActions?: boolean;
}

const DashboardItem = (props: Props) => {
    const { dashboard, showAuthor = true, showActions = false } = props
    const { author, background, id, name } = dashboard
    const [state, setState] = useState<MutationState>("preview")
    const { payload } = useSelector((state: IGlobalState) => state.dashboards)
    const dispatch = useDispatch()

    const isPreview = state === 'preview'
    const isEditing = state === 'edit'

    const link = isEditing ? '#' : `/dashboards/${id}`

    const getValue = (name: keyof IDashboardDTO & keyof IDashboard) => {
        return payload[name] || dashboard[name] || ''
    }
    const onChange: OnChange = (e) => {
        const { name, value } = e.target
        dispatch(updateDTODetails({ [name]: value }))
    }

    const onSave = () => {
        setState('preview')
    }
    const onEdit = () => {
        setState('edit')
        console.log('EDIT: impl')
    }
    const onCancel = () => {
        setState('preview')
    }

    const onDelete = () => {
        dispatch(deleteEntity('dashboards', id))
    }

    return (
        <Card className="dashboard dashboard-item" bg="dark" text="white">
            <Card.Img src={background} alt={`${author.username}/${name}`} />
            <Link to={link} className="dashboard-link">
                <Card.ImgOverlay>
                    <Card.Title className="dashboard-name">
                        <TextField
                            name="name"
                            value={getValue('name')}
                            onChange={onChange}
                            mutationState={state}
                        />
                    </Card.Title>
                    <Card.Text>
                        <TextField
                            name="description"
                            value={getValue('description')}
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
                    onDelete={isPreview ? onDelete : undefined}
                    onEdit={isPreview ? onEdit : undefined}
                    onCancel={isEditing ? onCancel : undefined}
                    onSave={isEditing ? onSave : undefined}
                />
            )}
        </Card>
    )
}

export default DashboardItem
