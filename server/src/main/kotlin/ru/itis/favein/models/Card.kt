package ru.itis.favein.models

import javax.persistence.*
import kotlin.math.min

@Entity
data class Card(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = -1,
        var name: String,
        /** TL;DR */
        @Column(length = 512)
        var description: String = "",
        /** Base content */
        @Column(length = 4096)
        var content: String = "",
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "list_id")
        var list: List,
        @ManyToMany
        var labels: Set<Label> = emptySet(),
        @ManyToMany
        var rates: Set<Rate> = emptySet(),
        @ManyToMany
        var comments: Set<Comment> = emptySet()
) {
    override fun toString(): String = name
    fun getAuthor(): User = list.getAuthor()
    fun getDashboard(): Dashboard = list.dashboard
    fun getSummary(): String {
        val summary = description + content
        return summary.substring(0, min(summary.length, 80)) + "..."
    }
}

data class CardDTO(
        var name: String = "",
        var description: String = "",
        var content: String = "",
        var listId: Long
)