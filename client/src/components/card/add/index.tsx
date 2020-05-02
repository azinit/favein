import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { create } from 'store/entities/service'
import FormCard from '../form'
// import './index.scss'

const AddCard = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const onClose = () => setShow(false);
    const onOpen = () => setShow(true);
    const onSave = () => {
        dispatch(create('cards'))
        onClose()
    }

    return (
        <>
            <Button
                className='card new-card border border-info w-400'
                variant="outline-info"
                onClick={onOpen}
            >
                + Card
            </Button>

            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormCard />
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

export default AddCard
