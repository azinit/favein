package ru.itis.favein.repository

import org.springframework.data.repository.CrudRepository
import ru.itis.favein.models.Pokemon

interface PokemonRepository: CrudRepository<Pokemon, Long> {
}