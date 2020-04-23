import React from 'react'
import { Card } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import './index.scss'

const AddDashboard = () => {
    return (
        <Card className="dashboard dashboard-add border-info" text="white">
            <Card.Body className="d-flex justify-content-center align-items-center">
                <Plus color="#17a2b8" size={50} className="icon"/>
            </Card.Body>
        </Card>
    )
}

export default AddDashboard
