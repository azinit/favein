import React from 'react'
import { Star, StarFill } from 'react-bootstrap-icons'

type Props = {
    rate: IRate;
    showAuthor?: boolean;
}

const Rate = (props: Props) => {
    const { rate, showAuthor = true } = props
    const { author, value } = rate
    // FIXME: with half=rates
    const empty = 5 - value;

    return (
        <div className="rate">
            {showAuthor &&
                <div className="rate-author">
                    {author.username}
                </div>
            }
            <div className="rate-stars">
                {[...Array(value)].map((_, i) => <StarFill key={`1-${i}`} />)}
                {[...Array(empty)].map((_, i) => <Star key={`0-${i}`} />)}
            </div>
        </div>
    )
}

export default Rate
