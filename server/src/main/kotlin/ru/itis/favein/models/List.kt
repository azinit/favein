package ru.itis.favein.models

import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
data class List(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,
        var name: String,
        var description: String = "",

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "board_id")
        @OnDelete(action = OnDeleteAction.CASCADE)
        var dashboard: Dashboard
) {
        override fun toString(): String = name
        fun getAuthor(): User = dashboard.author
}

data class ListDTO(
        var name: String = "New List",
        var description: String = "",
        var dashboardId: Long
)