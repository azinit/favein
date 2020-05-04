import React from 'react'
import CodeRenderer from 'components/code-renderer'
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown'

type Props = ReactMarkdownProps & {
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
