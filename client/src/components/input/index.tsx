import React from 'react'
import cn from 'classnames'
import { FormControlProps, Form } from 'react-bootstrap'
import './index.scss'

type Props = FormControlProps & {
    mutationState?: MutationState;
    onChange: OnChange;
    placeholder?: string;
    name: string;
    label?: string;
    className?: string;
}

const Input = (props: Props) => {
    const {
        value,
        name,
        type = "text",
        placeholder = "Введите значение",
        onChange,
        label,
        mutationState = "edit",
        className = ""
    } = props

    const isEditing = mutationState == "edit"
    const isPreview = mutationState == "preview"
    return (
        <Form.Group className={cn('input-control', `field_${name}`, mutationState, className)}>
            {label && (
                <Form.Label
                    children={label}
                />
            )}
            <Form.Control
                type={type}
                name={name}
                placeholder={isEditing ? placeholder : ''}
                value={value}
                onChange={onChange}
                disabled={isPreview}
            />
        </Form.Group>
    )
}

export default Input
