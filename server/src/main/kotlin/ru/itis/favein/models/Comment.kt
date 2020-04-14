package ru.itis.favein.models

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@ApiModel(description = "Информация по комментарию пользователя")
data class Comment(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @ApiModelProperty(notes = "Идентификатор дашборда", example = "2 (Korona-time!)")
        val id: Long = -1,
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "author_id")
        @ApiModelProperty(notes = "Автор", example = "john")
        var author: User,
        @Column(length = 4096)
        @ApiModelProperty(notes = "Содержание", example = "Korona-time!")
        var content: String = "",
        @ApiModelProperty(notes = "Дата создания", example = "2020-04-04 18:07:27.000000")
        var createdAt: LocalDateTime = LocalDateTime.now()
) {
    override fun toString(): String = content
}

@ApiModel(description = "Информация по комментарию пользователя (DTO)")
data class CommentDTO(
        @ApiModelProperty(notes = "Содержание", example = "Korona-time!")
        var content: String = "",
        @ApiModelProperty(notes = "Автор", example = "2 (john)")
        var authorId: Long
)