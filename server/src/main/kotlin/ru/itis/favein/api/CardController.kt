package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Card
import ru.itis.favein.models.CardDTO
import ru.itis.favein.models.Label
import ru.itis.favein.repository.*
import javax.validation.Valid


@RestController
@Api("Card API", description = "Операции с карточками")
@RequestMapping("api/cards", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
@PreAuthorize("isAuthenticated()")
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
    @ApiOperation("Получить список карточек")
    @GetMapping
    fun findAll(
            @ApiParam("Уникальный идентификатор списка\n(если нужно получить только карточки относящиеся к списку)")
            @RequestParam("list-id") listId: Long?
    ): ResponseEntity<MutableIterable<Card>> {
        // Get all cards
        if (listId === null) {
            return ResponseEntity(cardRepository.findAll(), HttpStatus.OK)
        }
        // Get only related cards
        val listOptional = listRepository.findById(listId)
        if (listOptional.isPresent) {
            return ResponseEntity(cardRepository.findByListId(listId), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Получить информацию по карточке")
    @GetMapping("/{card-id}")
    fun findById(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") id: Long
    ): ResponseEntity<Card> {
        val entity = cardRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Создать новую карточку")
    @PostMapping
    fun create(
            @ApiParam("Обновляемая информация карточки", required = true)
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

    @ApiOperation("Обновить существующую карточку")
    @PutMapping("/{card-id}")
    fun update(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") id: Long,
            @ApiParam("Обновляемая информация карточки", required = true)
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

    @ApiOperation("Удалить существующую карточку")
    @DeleteMapping("/{card-id}")
    fun delete(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = cardRepository.findById(id)
        if (entity.isPresent) {
            cardRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    /// start region List
    @ApiOperation("Прикрепить карточку к списку")
    @PutMapping("/{card-id}/attach-to/{list-id}")
    fun attachTo(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long,
            @ApiParam("Уникальный идентификатор списка", required = true)
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
    // FIXME: process if Label not attached to card before and etc...

    @ApiOperation("Добавить комментарий к карточке")
    @PutMapping("/{card-id}/comments/add/{comment-id}")
    fun addComment(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long,
            @ApiParam("Уникальный идентификатор комментария", required = true)
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

    @ApiOperation("Удалить комментарий с карточки")
    @PutMapping("/{card-id}/comments/remove/{comment-id}")
    fun removeComment(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long,
            @ApiParam("Уникальный идентификатор комментария", required = true)
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
    @ApiOperation("Добавить метку к карточке")
    @PutMapping("/{card-id}/labels/add/{label-id}")
    fun addLabel(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long,
            @ApiParam("Уникальный идентификатор метки", required = true)
            @PathVariable("label-id") labelId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val labelOptional = labelRepository.findById(labelId)
        if (cardOptional.isPresent && labelOptional.isPresent) {
            val card = cardOptional.get()
            val label = labelOptional.get()
            card.labels += label
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Удалить метку с карточки")
    @PutMapping("/{card-id}/labels/remove/{label-id}")
    fun removeLabel(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long,
            @ApiParam("Уникальный идентификатор метки", required = true)
            @PathVariable("label-id") labelId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val labelOptional = labelRepository.findById(labelId)
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
    @ApiOperation("Добавить оценку к карточке")
    @PutMapping("/{card-id}/rates/add/{rate-id}")
    fun addRate(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long,
            @ApiParam("Уникальный идентификатор оценки", required = true)
            @PathVariable("rate-id") rateId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val rateOptional = rateRepository.findById(rateId)
        if (cardOptional.isPresent && rateOptional.isPresent) {
            val card = cardOptional.get()
            val rate = rateOptional.get()
            card.rates += rate
            cardRepository.save(card)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Удалить оценку с карточки")
    @PutMapping("/{card-id}/rates/remove/{rate-id}")
    fun removeRate(
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long,
            @ApiParam("Уникальный идентификатор оценки", required = true)
            @PathVariable("rate-id") rateId: Long
    ): ResponseEntity<HttpStatus> {
        val cardOptional = cardRepository.findById(cardId)
        val rateOptional = rateRepository.findById(rateId)
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