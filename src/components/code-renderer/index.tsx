
import React, { PureComponent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

// https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada
// Examples: https://highlightjs.org/static/demo/

type Props = {
    value: string;
    language?: string;
}

class CodeRenderer extends PureComponent<Props> {
    static defaultProps = {
        language: null
    };

    render() {
        const { language, value } = this.props;
        return (
            <SyntaxHighlighter language={language} style={theme}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

export default CodeRenderer;