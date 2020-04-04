package ru.itis.favein.models

import org.hibernate.validator.constraints.Range
import javax.persistence.*

@Entity
data class Rate(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        val author: User,
        @Range(min=1, max=5)
        val value: Int
) {
    override fun toString(): String = value.toString()
}