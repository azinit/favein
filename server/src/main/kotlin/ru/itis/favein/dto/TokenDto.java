package ru.itis.favein.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import ru.itis.favein.models.User;

@Data
@AllArgsConstructor
public class TokenDto {
    private String token;
    private User user;
}
