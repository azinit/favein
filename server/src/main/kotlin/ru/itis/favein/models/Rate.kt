package ru.itis.favein.models

import org.hibernate.validator.constraints.Range
import javax.persistence.*

@Entity
data class Rate(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        var author: User,
        @Range(min=1, max=5)
        var value: Int
) {
    override fun toString(): String = value.toString()
}

data class RateDTO(
        var value: Int = 0,
        var authorId: Long
)