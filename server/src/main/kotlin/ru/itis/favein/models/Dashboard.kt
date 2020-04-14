package ru.itis.favein.models

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.persistence.*

@Entity
@ApiModel(description = "Информация по дашборду пользователя")
data class Dashboard(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @ApiModelProperty(notes = "Идентификатор дашборда", example = "3 (React)")
        val id: Long = -1,
        @ApiModelProperty(notes = "Название", example = "React")
        var name: String = "",
        @ApiModelProperty(notes = "Описание", example = "React topic")
        var description: String = "",
        /** img-url */
        @ApiModelProperty(notes = "URI на задний фон", example = "https://miro.medium.com/max/3600/1*HSisLuifMO6KbLfPOKtLow.jpeg")
        var background: String = "",
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        @ApiModelProperty(notes = "Автор", example = "john")
        var author: User
        // TODO: add collaborators field
) {
    override fun toString(): String = name
}

@ApiModel(description = "Информация по дашборду пользователя (DTO)")
data class DashboardDTO(
        @ApiModelProperty(notes = "Название", example = "React")
        var name: String = "",
        @ApiModelProperty(notes = "Описание", example = "React topic")
        var description: String = "",
        @ApiModelProperty(notes = "URI на задний фон", example = "https://miro.medium.com/max/3600/1*HSisLuifMO6KbLfPOKtLow.jpeg")
        var background: String = "",
        @ApiModelProperty(notes = "Идентификатор автора", example = "2 (john)")
        var authorId: Long
)