import React from 'react'
import Preview from 'components/markdown'
import Editor from './editor'
import { useSelector } from 'react-redux'

const Content = () => {
    const { current, mutationState } = useSelector((state: IGlobalState) => state.cards)

    return (
        <div className="content mb-4">
            {mutationState === 'preview' && <Preview source={current!.content} />}
            {mutationState === 'edit' && <Editor source={current!.content} />}
        </div>
    )
}

export default Content
