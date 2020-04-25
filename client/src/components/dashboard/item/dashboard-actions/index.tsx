import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { PencilSquare, Trash } from 'react-bootstrap-icons'

type Props = {
    onDelete: Function;
}

const DashboardActions = (props: Props) => {
    const { onDelete } = props
    return (
        <div className="dashboard-actions" style={{ width: '100%' }}>
            <ButtonGroup style={{ width: '100%' }}>
                <Button
                    className="rounded-0 action edit"
                    variant="dark"
                    onClick={() => console.log('EDIT')}
                    children={<PencilSquare />}
                />
                <Button
                    className="rounded-0 action delete"
                    variant="dark"
                    onClick={() => onDelete()}
                    children={<Trash />}
                />
            </ButtonGroup>
        </div>
    )
}

export default DashboardActions
