import React, { FormEvent, useState, useEffect } from 'react'
import cn from 'classnames'
import { Card, Alert } from 'react-bootstrap'
import { ChatSquare, PersonFill, Star } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'
import { getActions } from 'store/entities/service'
import Labels from '../labels'
import API from 'api'

const Header = () => {
    const [favesAmount, setFavesAmount] = useState(0)
    const { current, mutationState } = useSelector((state: IGlobalState) => state.cards)
    const { name, labels, description, author, comments, rates, id } = current!

    useEffect(() => {
        API.cards
            .getFavesAmount(id)
            .then(response => setFavesAmount(response.data))
    })

    const isEditing = mutationState === 'edit'
    const { updateDTODetails } = getActions('cards')
    const dispatch = useDispatch()

    const onChange = (e: FormEvent<HTMLDivElement>) => {
        // @ts-ignore
        const { textContent, id } = e.target
        dispatch(updateDTODetails({ [id]: textContent }))
    }

    return (
        <>
            <Card.Title className={cn("text-center p-1", { 'border border-info rounded': isEditing })}>
                <span id="name" className='h2' contentEditable={isEditing} onInput={onChange}>
                    {name}
                </span>
            </Card.Title>
            <Card.Subtitle className="text-secondary text-center mb-2">{author.username} ({author.email})</Card.Subtitle>
            <section className="text-center">
                <a className='link-reset' href="#comments">{comments.length}&nbsp;<ChatSquare className="mb-1" size={15} /></a>
                &nbsp;
                &nbsp;
                <a className='link-reset' href="#rates">{rates.length}<PersonFill className="mb-1" /></a>
                <span className="faves">
                    <span className='faves__amount ml-2'>{favesAmount}</span>
                    <Star className="faves__icon ml-1 mb-1" />
                </span>
            </section>
            <section>
                {(labels || isEditing) && (
                    <Labels />
                )}
                {(description || isEditing) && (
                    <Alert variant="info" className={cn({ 'border border-info bg-white': isEditing })}>
                        <div id='description' contentEditable={isEditing} onInput={onChange}>
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
