package ru.itis.favein.models

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*

@Entity
@ApiModel(description = "Информация по списку карточек")
data class List(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @ApiModelProperty(notes = "Идентификатор списка", example = "1 (Hooks)")
        val id: Long = -1,
        @ApiModelProperty(notes = "Название списка", example = "Hooks")
        var name: String,
        @ApiModelProperty(notes = "Описание списка", example = "React Hooks vs Class Components")
        var description: String = "",

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "board_id")
        @OnDelete(action = OnDeleteAction.CASCADE)
        @ApiModelProperty(notes = "Дашборд", example = "React")
        var dashboard: Dashboard
) {
        override fun toString(): String = name
        fun getAuthor(): User = dashboard.author
}

@ApiModel(description = "Информация по списку карточек (DTO)")
data class ListDTO(
        @ApiModelProperty(notes = "Название списка", example = "Hooks")
        var name: String = "New List",
        @ApiModelProperty(notes = "Описание списка", example = "React Hooks vs Class Components")
        var description: String = "",
        @ApiModelProperty(notes = "Идентификатор дашборда", example = "3 (React)")
        var dashboardId: Long
)