package ru.itis.favein.models

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.persistence.*
import kotlin.math.min

@Entity
@ApiModel(description = "Информация по карточке")
data class Card(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @ApiModelProperty(notes = "Идентификатор карточки", example = "1 (Хуки: обзор)")
        var id: Long = -1,
        @ApiModelProperty(notes = "Название", example = "Хуки: обзор")
        var name: String,
        /** TL;DR */
        @Column(length = 512)
        @ApiModelProperty(notes = "Описание", example = "Хуки — нововведение в React 16.8, которое позволяет использовать состояние и другие возможности React без написания классов.")
        var description: String = "",
        /** Base content */
        @Column(length = 10485760)
        @ApiModelProperty(notes = "Содержание", example = "Первый хук, который мы изучим, это функция useState. Не беспокойтесь, если этот пример будет поначалу неясен. Скоро мы разберёмся, как он работает.")
        var content: String = "",
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "list_id")
        @ApiModelProperty(notes = "Список", example = "Hooks")
        var list: List,
        @ManyToMany
        @ApiModelProperty(notes = "Метки", example = "[Important, Learn, ...]")
        var labels: Set<Label> = emptySet(),
        @ManyToMany
        @ApiModelProperty(notes = "Оценки", example = "[4☆ (god), 5☆ (admin), ...]")
        var rates: Set<Rate> = emptySet(),
        @ManyToMany
        @ApiModelProperty(notes = "Комментарии", example = "[... (god), ... (admin), ...]")
        var comments: Set<Comment> = emptySet()
) {
    override fun toString(): String = name
    fun getAuthor(): User = list.getAuthor()
    fun getDashboard(): Dashboard = list.dashboard
    fun getSummary(): String {
        val summary = description + content
        return summary.substring(0, min(summary.length, 80)) + "..."
    }
}

@ApiModel(description = "Информация по карточке (DTO)")
data class CardDTO(
        @ApiModelProperty(notes = "Название", example = "Хуки: обзор")
        var name: String = "",
        @ApiModelProperty(notes = "Описание", example = "Хуки — нововведение в React 16.8, которое позволяет использовать состояние и другие возможности React без написания классов.")
        var description: String = "",
        @ApiModelProperty(notes = "Содержание", example = "Первый хук, который мы изучим, это функция useState. Не беспокойтесь, если этот пример будет поначалу неясен. Скоро мы разберёмся, как он работает.")
        var content: String = "",
        @ApiModelProperty(notes = "Идентификатор списка", example = "1 (Hooks)")
        var listId: Long
)