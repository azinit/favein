package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.itis.favein.dto.SignInDto
import ru.itis.favein.dto.TokenDto
import ru.itis.favein.models.User
import ru.itis.favein.models.UserDTO
import ru.itis.favein.repository.UserRepository
import ru.itis.favein.services.AuthService

@Api("Auth API", description = "Операции для доступа к системе")
@RestController
@CrossOrigin(origins = ["*"])
class AuthController(
        @Autowired
        private val authService: AuthService,
        @Autowired
        private val userRepository: UserRepository
) {
    @ApiOperation("Авторизоваться в системе")
    @PostMapping("/api/sign-in")
    fun signIn(@RequestBody signInData: SignInDto): ResponseEntity<TokenDto> {
        return ResponseEntity.ok(authService.signIn(signInData))
    }

    @ApiOperation("Зарегистрироваться в системе")
    @PostMapping("/api/sign-up")
    fun signUp(@RequestBody details: UserDTO): ResponseEntity<HttpStatus> {
        val user = User(
                username = details.username,
                email = details.email,
                password = details.password,
                // TODO: after email confirm
                active = true
        )
        userRepository.save(user)
        return ResponseEntity(HttpStatus.OK)
    }
}