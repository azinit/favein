package ru.itis.favein.api

import io.swagger.annotations.Api
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Label
import ru.itis.favein.models.LabelDTO
import ru.itis.favein.repository.LabelRepository
import javax.validation.Valid


@RestController
@Api(value = "Label API", description = "Операции с метками")
@RequestMapping("api/labels")
@CrossOrigin(origins = ["*"])
class LabelController(
        @Autowired
        private val labelRepository: LabelRepository
) {

    @GetMapping
    fun findAll(): MutableIterable<Label> {
        return labelRepository.findAll()
    }

    @GetMapping("/{id}")
    fun findById(
            @PathVariable("id") id: Long
    ): ResponseEntity<Label> {
        val entity = labelRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PostMapping
    fun create(
            @RequestBody details: @Valid LabelDTO
    ): ResponseEntity<Long> {
        val label = Label(
                name = details.name,
                color = details.color
        )
        val (id) = labelRepository.save(label)
        return ResponseEntity(id, HttpStatus.OK)
    }

    @PutMapping("/{id}")
    fun update(
            @PathVariable("id") id: Long,
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

    @DeleteMapping("/{id}")
    fun delete(
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