package ru.itis.favein.api

import io.swagger.annotations.Api
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
@Api(value = "Comments API", description = "Операции с комментариями")
@RequestMapping("api/comments")
@CrossOrigin(origins = ["*"])
class CommentController(
        @Autowired
        private val commentRepository: CommentRepository,
        @Autowired
        private val userRepository: UserRepository
) {

    @GetMapping
    fun findAll(): MutableIterable<Comment> {
        return commentRepository.findAll()
    }

    @GetMapping("/{id}")
    fun findById(
            @PathVariable("id") id: Long
    ): ResponseEntity<Comment> {
        val entity = commentRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PostMapping
    fun create(
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

    @PutMapping("/{id}")
    fun update(
            @PathVariable("id") id: Long,
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

    @DeleteMapping("/{id}")
    fun delete(
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