package ru.itis.favein.repository

import org.springframework.data.repository.CrudRepository
import ru.itis.favein.models.Label

interface LabelRepository: CrudRepository<Label, Long> {
}