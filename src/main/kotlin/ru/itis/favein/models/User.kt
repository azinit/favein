package ru.itis.favein.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import javax.persistence.*

@Entity
@Table(name = "usr")
@ApiModel(description = "Информация по пользователю")
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @ApiModelProperty(notes = "Идентификатор пользователя", example = "1 (admin)")
        val id: Long = -1,
        // credentials
        @ApiModelProperty(notes = "Логин", example = "admin")
        private var username: String,
        @ApiModelProperty(notes = "Пароль", example = "*****")
        private var password: String,
        @ApiModelProperty(notes = "Почта", example = "admin@gmail.com")
        var email: String,
        @ApiModelProperty(notes = "Статус аккаунта (true - для действующего, false - для неактивного / удаленного / неподвтержденного)", example = "true")
        var active: Boolean = false,

        /** generate table for Role@Enum */
        @ElementCollection(targetClass = Role::class, fetch = FetchType.EAGER)
        /** store role in separate table, will join with current table by "user_id" */
        @CollectionTable(name = "user_role", joinColumns = [JoinColumn(name = "user_id")])
        /** is enum, how store */
        @Enumerated(EnumType.STRING)
        var roles: Set<Role> = setOf(Role.USER),

        var faves: String = ""
) : UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority> = roles
    override fun isEnabled(): Boolean = active
    override fun isCredentialsNonExpired(): Boolean = true
    override fun isAccountNonExpired(): Boolean = true
    override fun isAccountNonLocked(): Boolean = true

    // https://stackoverflow.com/questions/32970923/resolving-accidental-override-errors-in-kotlin
    override fun getUsername() = username

    override fun getPassword() = password
    override fun toString(): String = username
    fun isAdmin(): Boolean = roles.contains(Role.ADMIN)
    fun getStatus(): String = roles.joinToString()
}

@ApiModel(description = "Информация по пользователю (DTO)")
data class UserDTO(
        @ApiModelProperty(notes = "Логин", example = "admin")
        val username: String,
        @ApiModelProperty(notes = "Пароль", example = "*****")
        val password: String = "",
        @ApiModelProperty(notes = "Почта", example = "admin@gmail.com")
        val email: String
)