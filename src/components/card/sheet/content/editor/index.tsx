import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getActions } from 'store/entities/service'
import MarkdownEditor from 'for-editor'
import { Alert } from 'react-bootstrap'
// FIXME: integrate with editor
// import { darcula as theme } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Props = {
    source: string;
}

// based on https://github.com/kkfor/for-editor
const ContentEditor = ({ source }: Props) => {
    const [value, setValue] = useState(source)
    const dispatch = useDispatch()

    const onChange = (nextContent: string) => {
        // const { name, value } = e.target
        setValue(nextContent)
    }

    const _onSave = (nextContent: string) => {
        const { updateDTODetails } = getActions('cards')
        dispatch(updateDTODetails({ content: nextContent }))
        // dispatch(updateEntity('cards'))
        // onSave()
    }

    return (
        <>
            <Alert variant="warning">
                <i className="foricon for-save mr-2" />
                Не забывайте сохранить содержание карточки!
            </Alert>
            <MarkdownEditor
                language="en"
                value={value}
                onChange={onChange}
                onSave={_onSave}
            />
        </>
    )
}

export default ContentEditor
