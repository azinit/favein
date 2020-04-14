package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.Dashboard
import ru.itis.favein.models.DashboardDTO
import ru.itis.favein.repository.DashboardRepository
import ru.itis.favein.repository.UserRepository
import javax.validation.Valid


@RestController
@Api("Dashboard API", description = "Операции с dashboards")
@RequestMapping("api/dashboards", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
class DashboardController(
        @Autowired
        private val dashboardRepository: DashboardRepository,
        @Autowired
        private val userRepository: UserRepository
) {
    @ApiOperation("Получить все дашборды")
    @GetMapping
    fun findAll(): MutableIterable<Dashboard> {
        return dashboardRepository.findAll()
    }

    @ApiOperation("Получить информацию по дашборду")
    @GetMapping("/{id}")
    fun findById(
            @ApiParam("Уникальный идентификатор дашборда", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<Dashboard> {
        val entity = dashboardRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Создать новый дашборд")
    @PostMapping
    fun create(
            @ApiParam("Информация создаваемого дашборда", required = true)
            @RequestBody details: @Valid DashboardDTO
    ): ResponseEntity<Long> {
        val optional = userRepository.findById(details.authorId)
        if (optional.isPresent) {
            val user = optional.get()
            val dashboard = Dashboard(
                    name = details.name,
                    description = details.description,
                    author = user,
                    background = details.background
            )
            val (id) = dashboardRepository.save(dashboard)
            return ResponseEntity(id, HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Обновить существующий дашборд")
    @PutMapping("/{id}")
    fun update(
            @ApiParam("Уникальный идентификатор дашборда", required = true)
            @PathVariable("id") id: Long,
            @ApiParam("Информация обновляемого дашборда", required = true)
            @RequestBody details: @Valid DashboardDTO
    ): ResponseEntity<HttpStatus> {
        val entity = dashboardRepository.findById(id)
        if (entity.isPresent) {
            val dashboard = entity.get()
            dashboard.name = details.name
            dashboard.description = details.description
            dashboardRepository.save(dashboard)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Удалить существующий дашборд")
    @DeleteMapping("/{id}")
    fun delete(
            @ApiParam("Уникальный идентификатор дашборда", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = dashboardRepository.findById(id)
        if (entity.isPresent) {
            dashboardRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}