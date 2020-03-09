package ru.itis.favein.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.itis.favein.models.Card
import ru.itis.favein.models.Label
import ru.itis.favein.repository.CardLabelRepository
import ru.itis.favein.repository.CardRepository

@Service
class CardService (
    @Autowired
    private val cardRepo: CardRepository,
    @Autowired
    private val cardLabelRepo: CardLabelRepository
) {
    fun getLabels(card: Card): List<Label> {
        return cardLabelRepo
                .findByCard(card)
                .map { it.label }
    }
}