package ru.itis.favein.api

import io.swagger.annotations.Api
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.User
import ru.itis.favein.models.UserDTO
import ru.itis.favein.repository.UserRepository
import javax.validation.Valid


@RestController
@Api(value = "User API", description = "Операции с users")
@RequestMapping("api/users")
@CrossOrigin(origins = ["*"])
class UserController(
        @Autowired
        private val userRepository: UserRepository
) {

    @GetMapping
    fun findAll(): MutableIterable<User> {
        return userRepository.findAll()
    }

    @GetMapping("/{id}")
    fun findById(
            @PathVariable("id") id: Long
    ): ResponseEntity<User> {
        val entity = userRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PostMapping
    fun create(
            @RequestBody details: @Valid UserDTO
    ): ResponseEntity<Long> {
        val user = User(
                username = details.username,
                email = details.email,
                password = details.password,
                // TODO: after email confirm
                active = true
        )
        val (id) = userRepository.save(user)
        return ResponseEntity(id, HttpStatus.OK)
    }

    @PutMapping("/{id}")
    fun update(
            @PathVariable("id") id: Long,
            @RequestBody details: @Valid UserDTO
    ): ResponseEntity<HttpStatus> {
        val entity = userRepository.findById(id)
        if (entity.isPresent) {
            val user = entity.get()
            //TODO: user.username = details.username
            //TODO: user.password = details.password
            user.email = details.email
            userRepository.save(user)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @DeleteMapping("/{id}")
    fun delete(
            @PathVariable("id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = userRepository.findById(id)
        if (entity.isPresent) {
            userRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}