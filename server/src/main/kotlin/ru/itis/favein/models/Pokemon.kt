package ru.itis.favein.models

import javax.persistence.*

@Entity
data class Pokemon(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = -1,
        @Column
        var name: String
)
