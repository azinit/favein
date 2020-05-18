import React from 'react'
import { useSelector } from 'react-redux'
import Label from 'components/label/mutable'

const Labels = () => {
    const { current, mutationState } = useSelector((state: IGlobalState) => state.cards)
    const totalLabels = useSelector((state: IGlobalState) => state.labels.entities)
    const relatedLabeldIds = current!.labels.map(l => l.id)
    const visibleLabels = (mutationState === 'edit') ? totalLabels : current!.labels
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
