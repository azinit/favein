import React, { FormEvent } from 'react'
import cn from 'classnames'
import { Card, Alert } from 'react-bootstrap'
import { ChatSquare, PersonFill } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { getActions } from 'store/entities/service'
import Labels from '../labels'

type Props = {
    mutationState: MutationState;
}

const Header = (props: Props) => {
    const { name, labels, description, author, comments, rates } = useSelector((state: IGlobalState) => state.cards.current!)
    const isEditing = props.mutationState === 'edit'
    const { updateDTODetails } = getActions('cards')
    const dispatch = useDispatch()

    const onChange = (e: FormEvent<HTMLDivElement>) => {
        // @ts-ignore
        const { textContent, id } = e.target
        dispatch(updateDTODetails({ [id]: textContent }))
    }

    return (
        <>
            <Card.Title
                className={cn(
                    "text-center p-1",
                    { 'border border-info rounded': isEditing }
                )}
            >
                <span
                    id="name"
                    className='h2'
                    contentEditable={isEditing}
                    onInput={onChange}
                >
                    {name}
                </span>
            </Card.Title>
            <Card.Subtitle className="text-secondary text-center mb-2">{author.username} ({author.email})</Card.Subtitle>
            <section className="text-center">
                <a className='link-reset' href="#comments">{comments.length}&nbsp;<ChatSquare /></a>
                    &nbsp;
                    &nbsp;
                    <a className='link-reset' href="#rates">{rates.length}<PersonFill /></a>
            </section>
            <section>
                {labels && (
                    <Labels {...props} />
                )}
                {description && (
                    <Alert
                        variant="info"
                        className={cn({ 'border border-info bg-white': isEditing })}
                    >
                        <div
                            id='description'
                            contentEditable={isEditing}
                            onInput={onChange}
                        >
                            {description}
                        </div>
                    </Alert>
                )}
            </section>
            <hr />
        </>
    )
}

export default Header
