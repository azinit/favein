import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { PencilSquare, Trash } from 'react-bootstrap-icons'

type Props = {

}
const DashboardActions = (props: Props) => {
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
                    onClick={() => console.log('DELETE')}
                    children={<Trash />}
                />
            </ButtonGroup>
        </div>
    )
}

export default DashboardActions
