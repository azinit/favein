import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import './index.scss'

type Props = {
    className?: string;
}

const Loader = ({ className }: Props) => (
    <div className={`loader ${className}`}>
        <Spinner animation="border" variant="info" />
    </div>
)

export default Loader
