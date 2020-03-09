package ru.itis.favein.models

import javax.persistence.*

@Entity
data class Card(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int,
        val name: String,
        /** TL;DR */
        @Column(length = 512)
        val description: String = "",
        /** Base content */
        @Column(length = 4096)
        val content: String = "",
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "list_id")
        val list: List
) {
        override fun toString(): String = name
        fun getAuthor(): User = list.getAuthor()
        fun getDashboard(): Dashboard = list.dashboard
        fun getTLDR(): String = (description + content).substring(0, 80) + "..."
}