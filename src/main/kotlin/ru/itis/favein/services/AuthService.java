package ru.itis.favein.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import ru.itis.favein.dto.SignInDto;
import ru.itis.favein.dto.TokenDto;
import ru.itis.favein.models.User;
import ru.itis.favein.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository usersRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secret;

    public TokenDto signIn(SignInDto signInData) {
        // получаем пользователя по его email
        User user = usersRepository.findByEmail(signInData.getEmail());
        // если у меня есть этот пользвователь
        if (user != null) {
            // если пароль подходит
            // FIXME: temp
            if (signInData.getPassword().equals(user.getPassword())) {
                // создаем токен
                String token = Jwts.builder()
                        .setSubject(String.valueOf(user.getId())) // id пользователя
                        .claim("username", user.getUsername()) // имя
                        // FIXME: temp -> returns: [ADMIN, USER]
                        .claim("roles", user.getAuthorities().toString()) // роль
                        .signWith(SignatureAlgorithm.HS256, secret) // подписываем его с нашим secret
                        .compact(); // преобразовали в строку
                return new TokenDto(token, user);
            } else throw new AccessDeniedException("Wrong email/password");
        } else throw new AccessDeniedException("User not found");
    }
}
