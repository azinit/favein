import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getActions } from 'store/entities/service'
import TextField from 'components/text-field'

const { updateDTODetails } = getActions('cards')

const CardForm = () => {
    const dispatch = useDispatch()
    const { description = "", name = "", content = "" } = useSelector((state: IGlobalState) => state.cards.payload)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)
        dispatch(updateDTODetails({ [name]: value }))
    }

    return (
        <Form>
            <TextField 
                label="Name"
                name="name"
                placeholder="Хуки: обзор"
                value={name}
                onChange={onChange}
            />
            <TextField 
                type="textarea"
                label="Description"
                name="description"
                placeholder="Хуки — нововведение в React 16.8, которое позволяет использовать состояние и ..."
                value={description}
                onChange={onChange}
            />
        </Form>
    )
}

export default CardForm
