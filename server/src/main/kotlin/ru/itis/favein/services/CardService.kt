package ru.itis.favein.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.itis.favein.models.Card
import ru.itis.favein.models.types.TypeCardCreate
import ru.itis.favein.models.types.TypeCardUpdate
import ru.itis.favein.repository.CardRepository

@Service
class CardService(
        @Autowired
        private val cardRepository: CardRepository,
        @Autowired
        private val listService: ListService

) {
    fun create(data: TypeCardCreate): Long {
        val relatedList = listService.read(data.listId)
        if (relatedList != null) {
            val card = Card(name = data.name, list = relatedList)
            val (id) = cardRepository.save(card)
            return id
        }
        return -1

    }

    fun read(id: Long): Card? {
        val cardOptional = cardRepository.findById(id)
        if (cardOptional.isPresent) {
            return cardOptional.get()
        }
        return null
    }

    fun update(data: TypeCardUpdate): Boolean {
        val relatedCard = read(data.id)
        if (relatedCard !== null) {
            relatedCard.name = data.name ?: relatedCard.name
//            relatedCard.list = listService.read(data.id) ?: relatedCard.list
            // TODO: add labels, rated, comments
            relatedCard.content = data.content ?: relatedCard.content
            relatedCard.description = data.description ?: relatedCard.description
            cardRepository.save(relatedCard)
            return true
        }
        return false
    }

    fun delete(id: Long): Boolean {
        return try {
            cardRepository.deleteById(id)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun readList(): MutableIterable<Card> {
        return cardRepository.findAll()
    }
}