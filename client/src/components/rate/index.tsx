import React from 'react'
import { Star, StarFill } from 'react-bootstrap-icons'

type Props = {
    rate: IRate;
}

const Rate = (props: Props) => {
    const { author, value } = props.rate
    const empty = 5 - value;

    return (
        <div className="rate">
            <div className="rate-author">
                {author.username}
            </div>
            <div className="rate-stars">
                {[...Array(value)].map((_, i) => <StarFill key={`1-${i}`} />)}
                {[...Array(empty)].map((_, i) => <Star key={`0-${i}`} />)}
            </div>
        </div>
    )
}

export default Rate
