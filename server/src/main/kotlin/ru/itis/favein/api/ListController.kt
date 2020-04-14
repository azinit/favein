package ru.itis.favein.api

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import ru.itis.favein.models.List
import ru.itis.favein.models.ListDTO
import ru.itis.favein.repository.DashboardRepository
import ru.itis.favein.repository.ListRepository
import javax.validation.Valid


// https://dzone.com/articles/how-to-create-rest-api-with-spring-boot
// https://www.baeldung.com/building-a-restful-web-service-with-spring-and-java-based-configuration
// https://medium.com/@swathisprasad/generating-and-consuming-rest-apis-with-spring-boot-2-angular-7-and-swagger-2-ee4abc3c6459
// https://hellokoding.com/full-stack-crud-web-app-and-restful-apis-web-services-example-with-spring-boot-jpa-hibernate-mysql-vuejs-and-docker/
// https://medium.com/better-programming/building-a-spring-boot-rest-api-a-php-developers-view-part-i-6add2e794646
// SEE: RepositoryRestResource

// https://github.com/springframeworkguru/springboot_swagger_example/blob/master/src/main/java/guru/springframework/controllers/ProductController.java
// IdMapper https://keepgrowing.in/java/springboot/how-to-get-json-response-only-with-an-id-of-the-related-entity/
// Not Full Data https://stackoverflow.com/questions/47948279/return-only-id-in-json-instead-full-entity-object
// https://www.logicbig.com/tutorials/misc/jackson/json-identity-reference.html


@RestController
@Api("List API", description = "Операции со списком карточек")
@RequestMapping("api/lists", produces = ["application/json"])
@CrossOrigin(origins = ["*"])
class ListController(
        @Autowired
        private val listRepository: ListRepository,
        @Autowired
        private val dashboardRepository: DashboardRepository
) {
    @ApiOperation("Получить все списки")
    @GetMapping
    fun findAll(): MutableIterable<List> {
        return listRepository.findAll()
    }

    @ApiOperation("Получить информацию по списку")
    @GetMapping("/{id}")
    fun findById(
            @ApiParam("Уникальный идентификатор списка", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<List> {
        val entity = listRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Создать новый список")
    @PostMapping
    fun create(
            @ApiParam("Информация создаваемого списка", required = true)
            @RequestBody details: @Valid ListDTO
    ): ResponseEntity<Long> {
        val optional = dashboardRepository.findById(details.dashboardId)
        if (optional.isPresent) {
            val dashboard = optional.get()
            val list = List(
                    name = details.name,
                    description = details.description,
                    dashboard = dashboard
            )
            val (id) = listRepository.save(list)
            return ResponseEntity(id, HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Обновить существующий список")
    @PutMapping("/{id}")
    fun update(
            @ApiParam("Уникальный идентификатор списка", required = true)
            @PathVariable("id") id: Long,
            @ApiParam("Информация обновляемого списка", required = true)
            @RequestBody details: @Valid ListDTO
    ): ResponseEntity<HttpStatus> {
        val entity = listRepository.findById(id)
        if (entity.isPresent) {
            val list = entity.get()
            list.name = details.name
            list.description = details.description
            listRepository.save(list)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Удалить существующий список")
    @DeleteMapping("/{id}")
    fun delete(
            @ApiParam("Уникальный идентификатор списка", required = true)
            @PathVariable("id") id: Long
    ): ResponseEntity<HttpStatus> {
        val entity = listRepository.findById(id)
        if (entity.isPresent) {
            listRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @ApiOperation("Прикрепить список к дашбоарду")
    @PutMapping("/{list-id}/attach-to/{dashboard-id}")
    fun attachTo(
            @ApiParam("Уникальный идентификатор списка", required = true)
            @PathVariable("list-id") listId: Long,
            @ApiParam("Уникальный идентификатор дашборда", required = true)
            @PathVariable("dashboard-id") dashboardId: Long
    ): ResponseEntity<HttpStatus> {
        val listOptional = listRepository.findById(listId)
        val dashboardOptional = dashboardRepository.findById(dashboardId)
        if (listOptional.isPresent && dashboardOptional.isPresent) {
            val list = listOptional.get()
            val dashboard = dashboardOptional.get()
            list.dashboard = dashboard
            listRepository.save(list)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}