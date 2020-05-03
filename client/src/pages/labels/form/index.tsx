import React, { ChangeEvent } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import TextField from 'components/text-field'
import { getActions, createEntity, updateEntity } from 'store/entities/service'
const { updateDTODetails, resetDTODetails, } = getActions('labels')

type Props = {
    onClose: Function;
}

const LabelForm = (props: Props) => {
    const { onClose } = props
    // TODO: add color picker
    const [show, setShow] = React.useState(true);
    const { current, payload, mutationState } = useSelector((state: IGlobalState) => state.labels)
    const dispatch = useDispatch()

    const onHide = () => {
        setShow(false)
        dispatch(resetDTODetails())
        onClose()
    }
    const onSave = () => {
        const action = (mutationState === 'create') ? createEntity : updateEntity
        dispatch(action('labels'))
        onClose()
    }

    const getValue = (name: keyof ILabelDTO & keyof ILabel) => {
        // FIXME: apply not for all items!
        return payload[name] || current![name] || ''
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(updateDTODetails({ [name]: value }))
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mutationState === 'create' && 'Новая метка'}
                    {mutationState === 'edit' && (
                        <span>
                            Метка
                            <span
                                className='ml-2 text-white p-1 rounded'
                                style={{ backgroundColor: current!.color }}
                            >
                                {current!.name}
                            </span>
                        </span>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <TextField
                        label="Заголовок метки"
                        name="name"
                        placeholder="Done"
                        value={getValue('name')}
                        onChange={onChange}
                    />
                    <TextField
                        style={{ border: `3px solid ${getValue('color')}` }}
                        label="Цвет метки в HEX формате"
                        name="color"
                        placeholder="#3acf91"
                        value={getValue('color')}
                        onChange={onChange}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className="text-center">
                <Button variant="info" onClick={onSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LabelForm
