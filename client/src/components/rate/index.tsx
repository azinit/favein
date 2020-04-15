import React from 'react'

type Props = {
    rate: IRate;
}

const Rate = (props: Props) => {
    const { author, value } = props.rate
    return (
        <div>
            { author.username }
            { value }
        </div>
    )
}

export default Rate
