package ru.itis.favein.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Card
import ru.itis.favein.models.types.TypeCardCreate
import ru.itis.favein.models.types.TypeCardUpdate
import ru.itis.favein.services.CardService

@RestController
@RequestMapping("api/cards")
@CrossOrigin(origins = ["*"])
class CardController(
        @Autowired
        private val cardService: CardService
) {
    @GetMapping
    fun readList(): MutableIterable<Card> {
        return cardService.readList()
    }

    @PostMapping("/create")
    fun create(@RequestBody data: TypeCardCreate): Long {
        return cardService.create(data)
    }

    @GetMapping("/{card-id}")
    fun read(@PathVariable("card-id") cardId: Long): Card? {
        return cardService.read(cardId)
    }

    @PostMapping("/update")
    fun update(@RequestBody card: TypeCardUpdate): Boolean {
        return cardService.update(card)
    }

    @DeleteMapping("/delete/{card-id}")
    fun delete(@PathVariable("card-id") cardId: Long): Boolean {
        return cardService.delete(cardId)
    }
}