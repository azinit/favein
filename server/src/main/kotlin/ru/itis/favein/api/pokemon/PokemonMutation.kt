package ru.itis.favein.api.pokemon

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import ru.itis.favein.models.Pokemon
import ru.itis.favein.repository.PokemonRepository

data class PokemonDTO(
        var name: String
)

@Component
class PokemonMutation (
    @Autowired
    private val pokemonRepository: PokemonRepository
) : GraphQLMutationResolver {
    fun create(data: PokemonDTO): Pokemon {
        println(">>")
        println(data)
        val pokemon = Pokemon(
                name=data.name
        )
        return pokemonRepository.save(pokemon)
    }
    fun update(data: Pokemon): Pokemon? {
        val related = pokemonRepository.findById(data.id)
        if (related.isPresent) {
            val pokemon = related.get()
            pokemon.name = data.name ?: pokemon.name
            return  pokemonRepository.save(pokemon)
        }
        return null
    }
    fun delete(id: Long): Boolean {
        pokemonRepository.deleteById(id)
        return true
    }
}