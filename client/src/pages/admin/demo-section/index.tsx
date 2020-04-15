import React from 'react'
import { Jumbotron } from 'react-bootstrap'

type Props = {
    title?: string;
    children: React.ReactChild | React.ReactNode;
}

const DemoSection = ({ title = "", children }: Props) => (
    <Jumbotron className="demo-section bg-white shadow">
        <div className="title mb-4">
            <h2 className="text-center">{title}</h2>
        </div>
        <div className="container d-flex justify-content-center">
            <div className="container-content">
                {children}
            </div>
        </div>
    </Jumbotron>
)
export default DemoSection
