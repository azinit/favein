package ru.itis.favein.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Card
import ru.itis.favein.repository.CardRepository
import ru.itis.favein.services.CardService

@RestController
@RequestMapping("api/card")
@CrossOrigin(origins = ["*"])
class CardController(
        @Autowired
        private val cardService: CardService
) {
    @PostMapping("/create")
    fun create(@RequestBody card: Card): Long {
        return cardService.create(card)
    }

    @GetMapping("/{card-id}")
    fun read(@PathVariable("card-id") cardId: Long): Card? {
        return cardService.read(cardId)
    }

    @PostMapping("/update")
    fun update(@RequestBody card: Card): Boolean {
        return cardService.update(card)
    }

    @DeleteMapping("/delete/{card-id}")
    fun delete(@PathVariable("card-id") cardId: Long): Boolean {
        return cardService.delete(cardId)
    }
}