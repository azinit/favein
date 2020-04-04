package ru.itis.favein.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.itis.favein.models.Card
import ru.itis.favein.repository.CardRepository
import java.util.*

@Service
class CardService(
        @Autowired
        private val cardRepository: CardRepository
) {
    fun create(card: Card): Long {
        return try {
            card.id = -1
            val (id) = cardRepository.save(card)
            id
        } catch (e: Exception) {
            -1
        }

    }

    fun read(id: Long): Card? {
        val cardOptional = cardRepository.findById(id)
        if (cardOptional.isPresent) {
            return cardOptional.get()
        }
        return null
    }

    fun update(card: Card): Boolean {
        return try {
            cardRepository.save(card)
            true
        } catch (e: Exception) {
            false
        }
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