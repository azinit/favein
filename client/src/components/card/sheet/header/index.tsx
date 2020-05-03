import React from 'react'
import { Card, Alert } from 'react-bootstrap'
import { ChatSquare, PersonFill } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import Labels from '../labels'

type Props = {
    mutationState: MutationState;
}

const Header = (props: Props) => {
    const { name, labels, description, author, comments, rates } = useSelector((state: IGlobalState) => state.cards.current!)
    const LabelsView = labels && <Labels {...props} />
    const DescriptionView = description && <Alert variant="info">{description}</Alert>
    return (
        <>
            <Card.Title className="text-center">{name}</Card.Title>
            <Card.Subtitle className="text-secondary text-center mb-2">{author.username} ({author.email})</Card.Subtitle>
            <section className="text-center">
                <a className='link-reset' href="#comments">{comments.length}&nbsp;<ChatSquare /></a>
                    &nbsp;
                    &nbsp;
                    <a className='link-reset' href="#rates">{rates.length}<PersonFill /></a>
            </section>
            <section>
                {LabelsView}
                {DescriptionView}
            </section>
            <hr />
        </>
    )
}

export default Header
