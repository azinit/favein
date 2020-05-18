package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import io.swagger.annotations.ApiResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Label
import ru.itis.favein.models.LabelDTO
import ru.itis.favein.repository.LabelRepository
import javax.validation.Valid


@RestController
@Api("Label API", description = "Операции с метками")
@RequestMapping("api/labels", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
@PreAuthorize("isAuthenticated()")
class LabelController(
        @Autowired
        private val labelRepository: LabelRepository
) {
    @ApiOperation("Получить список меток")
    @GetMapping
    fun findAll(): MutableIterable<Label> {
        return labelRepository.findAll()
    }

    @ApiOperation("Получить информацию по метке")
    @GetMapping("/{id}")
    fun findById(
            @ApiParam("Уникальный идентификатор метки", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<Label> {
        val entity = labelRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Создать новую метку")
    @PostMapping
    fun create(
            @ApiParam("Информация создаваемой метки", required = true)
            @RequestBody details: @Valid LabelDTO
    ): ResponseEntity<Long> {
        val label = Label(
                name = details.name,
                color = details.color
        )
        val (id) = labelRepository.save(label)
        return ResponseEntity(id, HttpStatus.OK)
    }

    @ApiOperation("Обновить существующую метку")
    @PutMapping("/{id}")
    fun update(
            @ApiParam("Уникальный идентификатор метки", required = true)
            @PathVariable("id") id: Long,
            @ApiParam("Обновляемая информация метки", required = true)
            @RequestBody details: @Valid LabelDTO
    ): ResponseEntity<HttpStatus> {
        val entity = labelRepository.findById(id)
        if (entity.isPresent) {
            val label = entity.get()
            label.name = details.name
            label.color = details.color
            labelRepository.save(label)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Удалить существующую метку")
    @DeleteMapping("/{id}")
    fun delete(
            @ApiParam("Уникальный идентификатор метки", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = labelRepository.findById(id)
        if (entity.isPresent) {
            labelRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}