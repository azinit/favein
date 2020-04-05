package ru.itis.favein.models.types

import java.io.Serializable

data class TypeCardCreate(
        val name: String,
        val listId: Long
) : Serializable

data class TypeCardUpdate(
        val id: Long,
        val name: String? = null,
        val description: String? = null,
        val content: String? = null
) : Serializable
