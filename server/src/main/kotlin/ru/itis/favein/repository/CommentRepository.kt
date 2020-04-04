package ru.itis.favein.repository

import org.springframework.data.repository.CrudRepository
import ru.itis.favein.models.Card
import ru.itis.favein.models.Comment
import ru.itis.favein.models.Rate

interface CommentRepository: CrudRepository<Comment, Long> {
}