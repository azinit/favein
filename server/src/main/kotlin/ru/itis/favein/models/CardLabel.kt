package ru.itis.favein.models

import javax.persistence.*

@Entity
data class CardLabel (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "card_id")
    val card: Card,
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "label_id")
    val label: Label
)
