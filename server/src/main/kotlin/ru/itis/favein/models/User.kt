package ru.itis.favein.models

import javax.persistence.*

@Entity
@Table(name = "usr")
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        // credentials
        var username: String,
        var password: String,
        var email: String,
        var active: Boolean = false,
        /**
         * By order:
         * ElementCollection:  generate table for Role@Enum
         * CollectionTable:    store role in separate table, will join with current table by "user_id"
         * Enumerated:         is enum, how store
         */
        @ElementCollection(targetClass = Role::class, fetch = FetchType.EAGER)
        @CollectionTable(name = "user_role", joinColumns = [JoinColumn(name = "user_id")])
        @Enumerated(EnumType.STRING)
        var roles: Set<Role> = setOf(Role.USER)
)