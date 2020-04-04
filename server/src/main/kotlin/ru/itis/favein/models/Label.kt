package ru.itis.favein.models

import javax.persistence.*

@Entity
data class Label(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    val color: String
) {
    fun getLabeledColor(): String = "color: ${this.color}"
    override fun toString(): String = name
}