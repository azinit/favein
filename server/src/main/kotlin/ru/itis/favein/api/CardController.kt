package ru.itis.favein.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Card
import ru.itis.favein.repository.CardRepository
import ru.itis.favein.services.CardService

@RestController
@RequestMapping("api/card/")
@CrossOrigin(origins = ["*"])
class CardController(
        @Autowired
        private val cardRepository: CardRepository
) {
    @GetMapping("{card-id}")
    fun read(
            @PathVariable("card-id") cardId: Long
    ): Card? {
        val card = cardRepository.findById(cardId)
        if (card.isPresent) {
            return card.get()
        }
        return null

    }

    fun delete(cardId: Long): Boolean {
        return try {
            cardRepository.deleteById(cardId)
            true
        } catch (e: Exception) {
            println(e)
            false
        }

    }
}