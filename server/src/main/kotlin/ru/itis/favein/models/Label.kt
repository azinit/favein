package ru.itis.favein.models

import javax.persistence.*

@Entity
data class Label(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = -1,
    var name: String,
    var color: String
) {
    fun getLabeledColor(): String = "color: ${this.color}"
    override fun toString(): String = name
}

data class LabelDTO(
        var name: String = "",
        var color: String = ""
)