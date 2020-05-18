import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Modal, Button } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { createEntity } from 'store/entities/service'
import FormDashboard from '../form'
import './index.scss'

const AddDashboard = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const onClose = () => setShow(false);
    const onOpen = () => setShow(true);
    const onSave = () => {
        dispatch(createEntity('dashboards'))
        onClose()
    }

    return (
        <>
            <Card className="dashboard dashboard-add border-info" text="white" onClick={onOpen}>
                <Card.Body className="d-flex justify-content-center align-items-center">
                    <Plus color="#17a2b8" size={50} className="icon" />
                </Card.Body>
            </Card>

            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление dashboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormDashboard/>
                </Modal.Body>
                <Modal.Footer className="text-center">
                    <Button variant="info" onClick={onSave}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddDashboard
