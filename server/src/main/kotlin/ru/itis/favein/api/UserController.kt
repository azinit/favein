package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.User
import ru.itis.favein.models.UserDTO
import ru.itis.favein.repository.CardRepository
import ru.itis.favein.repository.UserRepository
import javax.validation.Valid


@RestController
@Api("User API", description = "Операции с users")
@RequestMapping("api/users", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
@PreAuthorize("isAuthenticated()")
class UserController(
        @Autowired
        private val userRepository: UserRepository,
        @Autowired
        private val cardRepository: CardRepository
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

    fun processFaves(faves: String): List<Long> {
        if (faves == "") {
            return listOf()
        }
        return faves.split(" ").map { it.toLong() }
    }

    @ApiOperation("Добавить карточку в избранное")
    @PutMapping("{user-id}/faves/add/{card-id}")
    fun addFave(
            @ApiParam("Уникальный идентификатор пользователя", required = true)
            @PathVariable("user-id") userId: Long,
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long
    ): ResponseEntity<HttpStatus> {
        val userEntity = userRepository.findById(userId)
        val cardEntity = cardRepository.findById(cardId)
        if (userEntity.isPresent && cardEntity.isPresent) {
            val user = userEntity.get()
            val faveIds = processFaves(user.faves).toMutableSet()
            faveIds += cardId
            user.faves = faveIds.toSortedSet().joinToString(" ")
            userRepository.save(user)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Удалить карточку из избранного")
    @PutMapping("{user-id}/faves/delete/{card-id}")
    fun deleteFave(
            @ApiParam("Уникальный идентификатор пользователя", required = true)
            @PathVariable("user-id") userId: Long,
            @ApiParam("Уникальный идентификатор карточки", required = true)
            @PathVariable("card-id") cardId: Long
    ): ResponseEntity<HttpStatus> {
        val userEntity = userRepository.findById(userId)
        val cardEntity = cardRepository.findById(cardId)
        if (userEntity.isPresent && cardEntity.isPresent) {
            val user = userEntity.get()
            val faveIds = processFaves(user.faves)
                    .filter { it != cardId }
                    .toMutableSet()
            user.faves = faveIds.toSortedSet().joinToString(" ")
            userRepository.save(user)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}