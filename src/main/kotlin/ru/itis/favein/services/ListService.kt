package ru.itis.favein.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import ru.itis.favein.models.List
import ru.itis.favein.repository.ListRepository

@Service
class ListService(
        @Autowired
        private val listRepository: ListRepository
) {
    fun read(id: Long): List? {
        val optional = listRepository.findById(id)
        if (optional.isPresent) {
            return optional.get()
        }
        return null
    }
}