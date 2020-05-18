import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { createEntity } from 'store/entities/service'
import { cardsSlice } from 'store/entities'
import FormCard from '../form'
// import './index.scss'

const { resetDTODetails, updateDTODetails } = cardsSlice.actions

type Props = {
    listId: number;
}

const AddCard = (props: Props) => {
    const { listId } = props
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const onClose = () => {
        setShow(false)
        dispatch(resetDTODetails())
    };
    const onOpen = () => {
        dispatch(updateDTODetails({ listId }))
        setShow(true)
    };
    const onSave = () => {
        dispatch(createEntity('cards'))
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
