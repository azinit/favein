package ru.itis.favein.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.itis.favein.dto.SignInDto
import ru.itis.favein.dto.TokenDto
import ru.itis.favein.services.SignInService

@RestController
@CrossOrigin(origins = ["*"])
class AuthController(
        @Autowired
        private val signInService: SignInService
) {

    @PostMapping("/api/sign-in")
    fun signIn(@RequestBody signInData: SignInDto?): ResponseEntity<TokenDto> {
        return ResponseEntity.ok(signInService.signIn(signInData))
    }
}