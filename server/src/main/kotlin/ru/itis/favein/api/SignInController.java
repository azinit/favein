package ru.itis.favein.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.itis.favein.dto.SignInDto;
import ru.itis.favein.dto.TokenDto;
import ru.itis.favein.services.SignInService;

@RestController
@CrossOrigin(origins = "*")
public class SignInController {

    @Autowired
    private SignInService signInService;

    @PostMapping("/api/signIn")
    public ResponseEntity<TokenDto> signIn(@RequestBody SignInDto signInData) {
        return ResponseEntity.ok(signInService.signIn(signInData));
    }
}
