package ru.itis.favein.models

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.persistence.*

@Entity
@ApiModel(description = "Информация по метке")
data class Label(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = -1,
    @ApiModelProperty(notes = "Заголовок метки", example = "Done")
    var name: String,
    @ApiModelProperty(notes = "Цвет метки в HEX формате", example = "#3acf91")
    var color: String
) {
    fun getLabeledColor(): String = "color: ${this.color}"
    override fun toString(): String = name
}


@ApiModel(description = "Информация по метке (DTO)")
data class LabelDTO(
        @ApiModelProperty(notes = "Заголовок метки", example = "Done")
        var name: String = "",
        @ApiModelProperty(notes = "Цвет метки в HEX формате", example = "#3acf91")
        var color: String = ""
)