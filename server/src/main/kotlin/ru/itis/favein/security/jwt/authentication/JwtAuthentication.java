package ru.itis.favein.security.jwt.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.itis.favein.security.jwt.details.UserDetailsImpl;

import java.util.Collection;

// объект, который работает с JWT-аутентификацией
public class JwtAuthentication implements Authentication {

    // флаг аутентификации
    private boolean isAuthenticated = false;

    // токен
    private String token;
    // информация о пользователе
    private UserDetails userDetails;

    public JwtAuthentication(String token, String secret) {
        this.token = token;
        if (token != null) {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
            this.userDetails = UserDetailsImpl.builder()
                    .userId(Long.valueOf(claims.getSubject()))
                    .name((String) claims.get("name"))
                    .build();
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userDetails.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return userDetails;
    }

    @Override
    public Object getPrincipal() {
        return userDetails;
    }

    @Override
    public boolean isAuthenticated() {
        return isAuthenticated;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        this.isAuthenticated = isAuthenticated;
    }

    @Override
    public String getName() {
        return this.token;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
