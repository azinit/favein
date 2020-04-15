import React from 'react'

type Props = {
    children: React.ReactChild;
}

const DemoSection = (props: Props) => (
    <div className="demo-section jumbotron bg-white shadow">
        {props.children}
    </div>
)
export default DemoSection
