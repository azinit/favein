import React, { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { dashboardsSlice } from 'store/entities'

const { setCurrent, updateDTODetails, updateEntities } = dashboardsSlice.actions

type Props = {
}

const DashboardForm = (props: Props) => {
    const dispatch = useDispatch()
    const { background = "", description = "", name = "" } = useSelector((state: IGlobalState) => state.dashboards.data)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(updateDTODetails({ [name]: value }))
    }
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    placeholder="React"
                    value={name}
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
                    placeholder="React Topics"
                    value={description}
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Background image</Form.Label>
                <Form.Control
                    type="text"
                    name="background"
                    placeholder="https://some-img-hosting.org/pic.png"
                    value={background}
                    onChange={onChange}
                />
            </Form.Group>
        </Form>
    )
}

export default DashboardForm
