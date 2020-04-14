package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.User
import ru.itis.favein.models.UserDTO
import ru.itis.favein.repository.UserRepository
import javax.validation.Valid


@RestController
@Api("User API", description = "Операции с users")
@RequestMapping("api/users", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
class UserController(
        @Autowired
        private val userRepository: UserRepository
) {
    @ApiOperation("Получить список пользователей")
    @GetMapping
    fun findAll(): MutableIterable<User> {
        return userRepository.findAll()
    }

    @ApiOperation("Получить информацию по пользователю")
    @GetMapping("/{id}")
    fun findById(
            @ApiParam("Уникальный идентификатор пользователя", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<User> {
        val entity = userRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Создать нового пользователя")
    @PostMapping
    fun create(
            @ApiParam("Информация по создаваемому пользователю", required = true)
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

    @ApiOperation("Обновить существующего пользователя")
    @PutMapping("/{id}")
    fun update(
            @ApiParam("Уникальный идентификатор пользователя", required = true)
            @PathVariable("id") id: Long,
            @ApiParam("Информация по обновляемому пользователю", required = true)
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

    @ApiOperation("Удалить существующего пользователя")
    @DeleteMapping("/{id}")
    fun delete(
            @ApiParam("Уникальный идентификатор пользователя", required = true)
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