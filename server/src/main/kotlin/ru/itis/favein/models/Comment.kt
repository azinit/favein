package ru.itis.favein.models

import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Comment(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int,
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        val author: User,
        @Column(length = 4096)
        val content: String = "",
        val createdAt: LocalDateTime
) {
    override fun toString(): String = content
}