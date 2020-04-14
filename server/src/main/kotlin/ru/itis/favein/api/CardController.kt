package ru.itis.favein.api

import io.swagger.annotations.Api
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Card
import ru.itis.favein.models.CardDTO
import ru.itis.favein.repository.*
import javax.validation.Valid


@RestController
@Api(value = "Card API", description = "Операции с карточками")
@RequestMapping("api/cards")
@CrossOrigin(origins = ["*"])
class CardController(
        @Autowired
        private val cardRepository: CardRepository,
        @Autowired
        private val listRepository: ListRepository,
        @Autowired
        private val commentRepository: CommentRepository,
        @Autowired
        private val labelRepository: LabelRepository,
        @Autowired
        private val rateRepository: RateRepository
) {

    /// start region CRUD

    @GetMapping
    fun findAll(): MutableIterable<Card> {
        return cardRepository.findAll()
    }

    @GetMapping("/{id}")
    fun findById(
            @PathVariable("id") id: Long
    ): ResponseEntity<Card> {
        val entity = cardRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PostMapping
    fun create(
            @RequestBody details: @Valid CardDTO
    ): ResponseEntity<Long> {
        val optional = listRepository.findById(details.listId)
        if (optional.isPresent) {
            val list = optional.get()
            val card = Card(
                    name = details.name,
                    description = details.description,
                    list = list
            )
            val (id) = cardRepository.save(card)
            return ResponseEntity(id, HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{id}")
    fun update(
            @PathVariable("id") id: Long,
            @RequestBody details: @Valid CardDTO
    ): ResponseEntity<HttpStatus> {
        val entity = cardRepository.findById(id)
        if (entity.isPresent) {
            val card = entity.get()
            card.name = details.name
            card.description = details.description
            card.content = details.content
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @DeleteMapping("/{id}")
    fun delete(
            @PathVariable("id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = cardRepository.findById(id)
        if (entity.isPresent) {
            cardRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    /// start region List

    @GetMapping("/from/{list-id}")
    fun findByListId(
            @PathVariable("list-id") listId: Long
    ): ResponseEntity<MutableIterable<Card>> {
        val listOptional = listRepository.findById(listId)
        if (listOptional.isPresent) {
            return ResponseEntity(
                    cardRepository.findByListId(listId),
                    HttpStatus.OK
            )
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{card-id}/attach-to/{list-id}")
    fun attachTo(
            @PathVariable("card-id") cardId: Long,
            @PathVariable("list-id") listId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val listOptional = listRepository.findById(listId)
        if (cardOptional.isPresent && listOptional.isPresent) {
            val card = cardOptional.get()
            val list = listOptional.get()
            card.list = list
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    /// start region Comment

    // FIXME: addComment, removeComment and addLabel, removeLabel, ...

    @PutMapping("/{card-id}/comments/add/{comment-id}")
    fun addComment(
            @PathVariable("card-id") cardId: Long,
            @PathVariable("comment-id") commentId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val commentOptional = commentRepository.findById(commentId)
        // TODO: process if already attached?
        if (cardOptional.isPresent && commentOptional.isPresent) {
            val card = cardOptional.get()
            val comment = commentOptional.get()
            card.comments += comment
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{card-id}/comments/remove/{comment-id}")
    fun removeComment(
            @PathVariable("card-id") cardId: Long,
            @PathVariable("comment-id") commentId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val commentOptional = commentRepository.findById(commentId)
        if (cardOptional.isPresent && commentOptional.isPresent) {
            val card = cardOptional.get()
            val comment = commentOptional.get()
            card.comments -= comment
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    /// start region Label

    @PutMapping("/{card-id}/labels/add/{label-id}")
    fun addLabel(
            @PathVariable("card-id") cardId: Long,
            @PathVariable("label-id") labelId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val labelOptional = labelRepository.findById(labelId)
        // TODO: process if already attached?
        if (cardOptional.isPresent && labelOptional.isPresent) {
            val card = cardOptional.get()
            val label = labelOptional.get()
            card.labels += label
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{card-id}/labels/remove/{label-id}")
    fun removeLabel(
            @PathVariable("card-id") cardId: Long,
            @PathVariable("label-id") labelId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val labelOptional = labelRepository.findById(labelId)
        // TODO: process if already attached?
        if (cardOptional.isPresent && labelOptional.isPresent) {
            val card = cardOptional.get()
            val label = labelOptional.get()
            card.labels -= label
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    /// start region Rate

    @PutMapping("/{card-id}/rates/add/{rate-id}")
    fun addRate(
            @PathVariable("card-id") cardId: Long,
            @PathVariable("rate-id") rateId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val rateOptional = rateRepository.findById(rateId)
        // TODO: process if already attached?
        if (cardOptional.isPresent && rateOptional.isPresent) {
            val card = cardOptional.get()
            val rate = rateOptional.get()
            card.rates += rate
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{card-id}/rates/remove/{rate-id}")
    fun removeRate(
            @PathVariable("card-id") cardId: Long,
            @PathVariable("rate-id") rateId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val rateOptional = rateRepository.findById(rateId)
        // TODO: process if already attached?
        if (cardOptional.isPresent && rateOptional.isPresent) {
            val card = cardOptional.get()
            val rate = rateOptional.get()
            card.rates -= rate
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}