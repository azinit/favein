package ru.itis.favein.models

import io.swagger.annotations.ApiModel
import org.springframework.security.core.GrantedAuthority

@ApiModel(description = "Информация по ролям пользователя (USER / ADMIN)")
enum class Role : GrantedAuthority {
    USER, ADMIN;

    override fun getAuthority(): String = name;
}

