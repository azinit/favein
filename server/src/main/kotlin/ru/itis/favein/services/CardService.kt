package ru.itis.favein.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.itis.favein.repository.CardRepository

@Service
class CardService (
    @Autowired
    private val cardRepo: CardRepository
) {
//    fun getLabels(card: Card): List<Label> {
//        return cardLabelRepo
//                .findByCard(card)
//                .map { it.label }
//    }
}