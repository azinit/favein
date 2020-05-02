import React, { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { dashboardsSlice } from 'store/entities'
import TextField from 'components/text-field'

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
            <TextField 
                label="Name"
                name="name"
                placeholder="React"
                value={name}
                onChange={onChange}
            />
            <TextField 
                label="Description"
                name="description"
                placeholder="React Topics"
                value={description}
                onChange={onChange}
            />
            <TextField 
                label="Background image"
                name="background"
                placeholder="https://some-img-hosting.org/pic.png"
                value={background}
                onChange={onChange}
            />
        </Form>
    )
}

export default DashboardForm
