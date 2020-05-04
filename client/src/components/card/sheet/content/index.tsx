import React from 'react'
import Preview from 'components/markdown'
import Editor from './editor'
import { useSelector } from 'react-redux'

type Props = {
    mutationState: MutationState;
    setMutationState: (state: MutationState) => void;
}

const Content = ({ mutationState, setMutationState }: Props) => {
    const { content } = useSelector((state: IGlobalState) => state.cards.current!)

    const onSave = () => {
        setMutationState('preview')
    }

    return (
        <div className="content mb-4">
            {mutationState === 'preview' && <Preview source={content} />}
            {mutationState === 'edit' && <Editor source={content} onSave={onSave} />}
        </div>
    )
}

export default Content
