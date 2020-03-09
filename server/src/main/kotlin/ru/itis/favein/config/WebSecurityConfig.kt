package ru.itis.favein.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.password.NoOpPasswordEncoder
import ru.itis.favein.services.UserService

@Configuration
@EnableWebSecurity
class WebSecurityConfig(
    @Autowired
    private val userService: UserService
) : WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .authorizeRequests()
                    .antMatchers(
                            "/", "/signup", "/app/**"
//                            "/welcome", "/index", ,
//                            "/static/**/*", "/img/**", "/js/**", "/css/**"
                    ).permitAll()
                    .anyRequest().authenticated()
                .and()
                    .formLogin()
                    .loginPage("/login")
                    .defaultSuccessUrl("/admin")
                    .permitAll()
                .and()
                    .logout()
                    .permitAll()
    }

    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userService)
                .passwordEncoder(NoOpPasswordEncoder.getInstance())
    }
}