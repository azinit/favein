package ru.itis.favein.services;

import ru.itis.favein.dto.SignInDto;
import ru.itis.favein.dto.TokenDto;

public interface SignInService {
    TokenDto signIn(SignInDto signInData);
}
