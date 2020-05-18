package ru.itis.favein.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.itis.favein.models.User

interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): User?
    fun findByEmail(email: String): User?
}
