package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Comment
import ru.itis.favein.models.CommentDTO
import ru.itis.favein.repository.CommentRepository
import ru.itis.favein.repository.UserRepository
import javax.validation.Valid


@RestController
@Api("Comments API", description = "Операции с комментариями")
@RequestMapping("api/comments", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
class CommentController(
        @Autowired
        private val commentRepository: CommentRepository,
        @Autowired
        private val userRepository: UserRepository
) {
    @ApiOperation("Получить список комментариев")
    @GetMapping
    fun findAll(): MutableIterable<Comment> {
        return commentRepository.findAll()
    }

    @ApiOperation("Получить информацию по комментарию")
    @GetMapping("/{id}")
    fun findById(
            @ApiParam("Уникальный идентификатор комментария", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<Comment> {
        val entity = commentRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Создать новый комментарий")
    @PostMapping
    fun create(
            @ApiParam("Информация по создаваемому комментарию", required = true)
            @RequestBody details: @Valid CommentDTO
    ): ResponseEntity<Long> {
        val optional = userRepository.findById(details.authorId)
        if (optional.isPresent) {
            val user = optional.get()
            val comment = Comment(
                    content = details.content,
                    author = user
            )
            val (id) = commentRepository.save(comment)
            return ResponseEntity(id, HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Обновить существующий комментарий")
    @PutMapping("/{id}")
    fun update(
            @ApiParam("Уникальный идентификатор комментария", required = true)
            @PathVariable("id") id: Long,
            @ApiParam("Обновляемая информация комментария", required = true)
            @RequestBody details: @Valid CommentDTO
    ): ResponseEntity<HttpStatus> {
        val entity = commentRepository.findById(id)
        if (entity.isPresent) {
            val comment = entity.get()
            comment.content = details.content
            commentRepository.save(comment)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Удалить существующий комментарий")
    @DeleteMapping("/{id}")
    fun delete(
            @ApiParam("Уникальный идентификатор комментария", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = commentRepository.findById(id)
        if (entity.isPresent) {
            commentRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}