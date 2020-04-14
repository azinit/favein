package ru.itis.favein.models

import javax.persistence.*

@Entity
data class Dashboard(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,
        var name: String = "",
        var description: String = "",
        /** img-url */
        var background: String = "",
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        var author: User
        // TODO: add collaborators field
) {
    override fun toString(): String = name
}

data class DashboardDTO(
        var name: String = "",
        var description: String = "",
        var background: String = "",
        var authorId: Long
)