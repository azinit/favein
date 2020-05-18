import React from 'react'
import Rate from 'components/rate'
import { PersonFill } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'

const Rates = () => {
    const { rates } = useSelector((state: IGlobalState) => state.cards.current!)
    const rate = {
        author: {},
        id: -1,
        value: (!rates.length) ? 0 : Math.ceil(rates.map(r => r.value).reduce((a, b) => a + b) / rates.length)
    } as IRate

    return (
        <div className="rates">
            <h4 id="rates">Social rate</h4>
            <div className='d-flex align-items-center'>
                <Rate rate={rate} showAuthor={false} />
                {rates.length ? (
                    <div className='text-muted'>({rates.length}<PersonFill />)</div>
                ) : (
                        <span className='text-muted'>Be first!</span>
                    )}
            </div>
        </div>
    )
}

export default Rates
