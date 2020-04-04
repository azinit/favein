package ru.itis.favein.models

import javax.persistence.*

@Entity
data class List(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val name: String,
        val description: String = "",
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "board_id")
        val dashboard: Dashboard
) {
        override fun toString(): String = name
        fun getAuthor(): User = dashboard.author
}