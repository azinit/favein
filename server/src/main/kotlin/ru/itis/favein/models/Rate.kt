package ru.itis.favein.models

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import org.hibernate.validator.constraints.Range
import javax.persistence.*

@Entity
@ApiModel(description = "Информация по оценке пользователя")
data class Rate(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @ApiModelProperty(notes = "Идентификатор оценки", example = "3 (4☆ by user [god])")
        val id: Long = -1,
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        @ApiModelProperty(notes = "Автор оценки", example = "[god]")
        var author: User,
        @Range(min=1, max=5)
        @ApiModelProperty(notes = "Значение оценки", example = "4☆")
        var value: Int
) {
    override fun toString(): String = value.toString()
}

@ApiModel(description = "Информация по оценке пользователя (DTO)")
data class RateDTO(
        @ApiModelProperty(notes = "Значение оценки", example = "4☆")
        var value: Int = 0,
        @ApiModelProperty(notes = "Идентификатор автора оценки", example = "4 ([god])")
        var authorId: Long
)