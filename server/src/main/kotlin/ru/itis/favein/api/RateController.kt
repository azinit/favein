package ru.itis.favein.api

import io.swagger.annotations.Api
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Rate
import ru.itis.favein.models.RateDTO
import ru.itis.favein.repository.RateRepository
import ru.itis.favein.repository.UserRepository
import javax.validation.Valid


@RestController
@Api(value = "Rates API", description = "Операции с оценками")
@RequestMapping("api/rates")
@CrossOrigin(origins = ["*"])
class RateController(
        @Autowired
        private val rateRepository: RateRepository,
        @Autowired
        private val userRepository: UserRepository
) {

    @GetMapping
    fun findAll(): MutableIterable<Rate> {
        return rateRepository.findAll()
    }

    @GetMapping("/{id}")
    fun findById(
            @PathVariable("id") id: Long
    ): ResponseEntity<Rate> {
        val entity = rateRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PostMapping
    fun create(
            @RequestBody details: @Valid RateDTO
    ): ResponseEntity<Long> {
        val optional = userRepository.findById(details.authorId)
        if (optional.isPresent) {
            val user = optional.get()
            val rate = Rate(
                    value = details.value,
                    author = user
            )
            val (id) = rateRepository.save(rate)
            return ResponseEntity(id, HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{id}")
    fun update(
            @PathVariable("id") id: Long,
            @RequestBody details: @Valid RateDTO
    ): ResponseEntity<HttpStatus> {
        val entity = rateRepository.findById(id)
        if (entity.isPresent) {
            val rate = entity.get()
            rate.value = details.value
            rateRepository.save(rate)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @DeleteMapping("/{id}")
    fun delete(
            @PathVariable("id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = rateRepository.findById(id)
        if (entity.isPresent) {
            rateRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}