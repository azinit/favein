package ru.itis.favein.repository

import org.springframework.data.repository.CrudRepository
import ru.itis.favein.models.Card

interface CardRepository: CrudRepository<Card, Long> {
}