package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.dto.SignInDto
import ru.itis.favein.dto.TokenDto
import ru.itis.favein.models.User
import ru.itis.favein.models.UserDTO
import ru.itis.favein.repository.UserRepository
import ru.itis.favein.services.AuthService

@Api("Test API", description = "Тестовые эндпоинты")
@RestController
@CrossOrigin(origins = ["*"])
class TestController(
        @Autowired
        private val userRepository: UserRepository
) {
    @GetMapping("/api/test/get-list")
    fun getList(): ResponseEntity<List<User>> {
        return ResponseEntity.ok(userRepository.findAll())
    }

    @GetMapping("/api/test/some-endpoint")
    fun someEndpoint(): ResponseEntity<Any> {
        return ResponseEntity.ok(object {
            val id = 1
            val hook = "Lalalal"
            val name = "LA"
        })
    }
}