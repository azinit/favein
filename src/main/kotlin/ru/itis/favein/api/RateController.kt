package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Rate
import ru.itis.favein.models.RateDTO
import ru.itis.favein.repository.RateRepository
import ru.itis.favein.repository.UserRepository
import javax.validation.Valid


@RestController
@Api("Rates API", description = "Операции с оценками")
@RequestMapping("api/rates", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
@PreAuthorize("isAuthenticated()")
class RateController(
        @Autowired
        private val rateRepository: RateRepository,
        @Autowired
        private val userRepository: UserRepository
) {
    @ApiOperation("Получить список оценок")
    @GetMapping
    fun findAll(): MutableIterable<Rate> {
        return rateRepository.findAll()
    }

    @ApiOperation("Получить информацию по оценке")
    @GetMapping("/{id}")
    fun findById(
            @ApiParam("Уникальный идентификатор оценки", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<Rate> {
        val entity = rateRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Создать новую оценку")
    @PostMapping
    fun create(
            @ApiParam("Информация по создаваемой оценке", required = true)
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

    @ApiOperation("Обновить существующую оценку")
    @PutMapping("/{id}")
    fun update(
            @ApiParam("Уникальный идентификатор оценки", required = true)
            @PathVariable("id") id: Long,
            @ApiParam("Информация по редактируемой оценке", required = true)
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

    @ApiOperation("Удалить существующую оценку")
    @DeleteMapping("/{id}")
    fun delete(
            @ApiParam("Уникальный идентификатор оценки", required = true)
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