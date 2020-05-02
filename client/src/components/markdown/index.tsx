import React from 'react'
import CodeRenderer from 'components/code-renderer'
import ReactMarkdown from 'react-markdown'

type Props = {
    source: string;
}

const Markdown = ({ source }: Props) => {
    return (
        <ReactMarkdown
            source={source}
            renderers={{ code: CodeRenderer }}
        />
    )
}

export default Markdown
