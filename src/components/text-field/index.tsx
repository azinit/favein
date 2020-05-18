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
    style?: any;
    inline?: boolean;
}

const TextField = (props: Props) => {
    const {
        value,
        name,
        type = "text",
        placeholder = "Введите значение",
        onChange,
        label,
        mutationState = "edit",
        className = "",
        style = {},
        inline = false
    } = props

    const isEditing = mutationState === "edit"
    const isPreview = mutationState === "preview"

    const as = type === "textarea" ? "textarea" : "input"

    return (
        <Form.Group className={cn('text-field', `field_${name}`, mutationState, className, { inline })}>
            {label && (
                <Form.Label>{label}</Form.Label>
            )}
            <Form.Control
                style={style}
                type={type}
                name={name}
                placeholder={isEditing ? placeholder : ''}
                value={value}
                onChange={onChange}
                disabled={isPreview}
                as={as}
            />
        </Form.Group>
    )
}

export default TextField
