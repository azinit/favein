package ru.itis.favein.models

import javax.persistence.*

@Entity
data class Label(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val name: String,
    val color: String
) {
    fun getLabeledColor(): String {
        return "color: ${this.color}"
    }
}