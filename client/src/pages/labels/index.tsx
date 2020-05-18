import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from 'components/header'
import { readEntities, getActions } from 'store/entities/service'
import Label from 'components/label'
import LabelForm from './form'
import { Button } from 'react-bootstrap'

const LabelsPage = () => {
    const { setCurrent, setMutationState } = getActions('labels')
    const dispatch = useDispatch()
    const [show, setShow] = React.useState(false)
    const { entities = [] } = useSelector((state: IGlobalState) => state.labels)

    useEffect(() => {
        dispatch(readEntities('labels'))
    }, [dispatch])

    const onEdit = (id: number) => {
        const openedLabel = entities.find(e => e.id === id)!
        dispatch(setCurrent(openedLabel as any))
        dispatch(setMutationState('edit'))
        setShow(true)
    }
    const onCreate = () => {
        dispatch(setMutationState('create'))
        setShow(true)
    }


    const onClose = () => {
        setShow(false)
    }


    return (
        <div className='page page-labels'>
            <Header />
            <section className="jumbotron bg-white shadow">
                <h2>Global labels</h2>
                <div className="labels-list">
                    <Button variant='outline-success' onClick={onCreate} size="sm">
                        + Label
                    </Button>
                    {entities.map(label => (
                        <Label
                            key={label.id}
                            label={label}
                            onClick={onEdit}
                        />
                    ))}
                </div>
                {show && (
                    <LabelForm
                        onClose={onClose}
                    />
                )}
            </section>
        </div>
    )
}

export default LabelsPage
