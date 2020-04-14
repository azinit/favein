package ru.itis.favein.models

import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class Comment(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        var author: User,
        @Column(length = 4096)
        var content: String = "",
        var createdAt: LocalDateTime = LocalDateTime.now()
) {
    override fun toString(): String = content
}

data class CommentDTO(
        var content: String = "",
        var authorId: Long
)