import React from 'react'
import { useSelector } from 'react-redux'
import Label from 'components/label/mutable'

type Props = {
    mutationState: MutationState;
}

const Labels = (props: Props) => {
    const { mutationState } = props
    const { labels } = useSelector((state: IGlobalState) => state.cards.current!)
    const totalLabels = useSelector((state: IGlobalState) => state.labels.entities)
    const relatedLabeldIds = labels.map(l => l.id)
    const visibleLabels = (mutationState === 'edit') ? totalLabels : labels
    return (
        <div className="labels d-flex justify-content-center flex-wrap">
            {visibleLabels.map(l => (
                <Label
                    key={l.id}
                    label={l}
                    mutationState={mutationState}
                    isRelated={relatedLabeldIds.includes(l.id)}
                />
            ))}
        </div>
    )
}

export default Labels
