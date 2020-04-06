package ru.itis.favein.api.pokemon

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import ru.itis.favein.models.Pokemon
import ru.itis.favein.repository.PokemonRepository
import java.util.*


@Component
class PokemonQuery(
        @Autowired
        private val pokemonRepository: PokemonRepository
) : GraphQLQueryResolver {
    fun getPokemon(id: Long): Pokemon {
        return pokemonRepository.findById(id).orElse(null)
    }
    fun getPokemons(): MutableIterable<Pokemon> {
        return pokemonRepository.findAll()
    }
}