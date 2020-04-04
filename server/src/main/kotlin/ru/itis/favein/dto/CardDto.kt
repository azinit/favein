package ru.itis.favein.dto

import ru.itis.favein.models.Comment
import ru.itis.favein.models.Label
import ru.itis.favein.models.List
import ru.itis.favein.models.Rate

class CardDto(
        val name: String,
        val description: String = "",
        val content: String = "",
        val list: List,
        val labels: Set<Label>,
        val rates: Set<Rate>,
        val comments: Set<Comment>
) {

}