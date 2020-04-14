package ru.itis.favein.models

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import javax.persistence.*

@Entity
@Table(name = "usr")
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,
        // credentials
        private var username: String,
        private var password: String,
        var email: String,
        var active: Boolean = false,

        /** generate table for Role@Enum */
        @ElementCollection(targetClass = Role::class, fetch = FetchType.EAGER)
        /** store role in separate table, will join with current table by "user_id" */
        @CollectionTable(name = "user_role", joinColumns = [JoinColumn(name = "user_id")])
        /** is enum, how store */
        @Enumerated(EnumType.STRING)
        var roles: Set<Role> = setOf(Role.USER)
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

data class UserDTO(
        val username: String,
        val email: String,
        val password: String = ""
)