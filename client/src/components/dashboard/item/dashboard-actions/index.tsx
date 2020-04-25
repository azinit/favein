import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { PencilSquare, Trash, X, FileEarmarkCheck } from 'react-bootstrap-icons'

type Props = {
    onDelete?: Function;
    onEdit?: Function;
    onCancel?: Function;
    onSave?: Function;
}

const DashboardActions = (props: Props) => {
    const { onDelete, onEdit, onCancel, onSave } = props
    const buttons = [
        { id: 1, onClick: onEdit, className: 'edit', component: <PencilSquare /> },
        { id: 2, onClick: onDelete, className: 'delete', component: <Trash /> },
        { id: 3, onClick: onCancel, className: 'cancel', component: <X /> },
        { id: 4, onClick: onSave, className: 'save', component: <FileEarmarkCheck /> },
    ]
    return (
        <div className="dashboard-actions" style={{ width: '100%' }}>
            <ButtonGroup style={{ width: '100%' }}>
                {buttons.filter(btn => !!btn.onClick).map(({ onClick, className, component, id }) => (
                    <Button
                        key={id}
                        className={`rounded-0 action ${className}`}
                        variant="dark"
                        onClick={() => onClick!()}
                        children={component}
                    />
                ))}
            </ButtonGroup>
        </div>
    )
}

export default DashboardActions
