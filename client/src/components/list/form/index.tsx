import React, { ChangeEvent, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { getActions, createEntity } from 'store/entities/service'
import TextField from 'components/text-field'

const { updateDTODetails, resetDTODetails } = getActions('lists')

const ListForm = () => {
    const dashboardId = +window.location.pathname.replace("/dashboards/", "")

    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const onClose = () => {
        setShow(false)
        dispatch(resetDTODetails())
    };
    const onOpen = () => {
        dispatch(updateDTODetails({ dashboardId }))
        setShow(true)
    };
    const onSave = () => {
        dispatch(createEntity('lists'))
        onClose()
    }

    const { description = "", name = "" } = useSelector((state: IGlobalState) => state.lists.payload)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        dispatch(updateDTODetails({ [name]: value }))
    }

    return (
        <>
            <Button
                block
                variant="outline-info"
                className='rounded-0'
                onClick={() => {
                    console.log('=> Add List')
                    onOpen()
                }}
            >
                <Plus />&nbsp;New list
            </Button>

            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <TextField
                            label="Name"
                            name="name"
                            placeholder="Hooks"
                            value={name}
                            onChange={onChange}
                        />
                        <TextField
                            type="textarea"
                            label="Description"
                            name="description"
                            placeholder="React Hooks vs Class Components"
                            value={description}
                            onChange={onChange}
                        />
                    </Form>
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

export default ListForm
