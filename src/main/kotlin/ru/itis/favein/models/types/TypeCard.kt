package ru.itis.favein.models.types

data class TypeCardCreate(
        val name: String,
        val listId: Long
)

data class TypeCardUpdate(
        val id: Long,
        val name: String? = null,
        val description: String? = null,
        val content: String? = null
)
