package ru.itis.favein.api

import io.swagger.annotations.Api
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
@Api(value = "List API", description = "Операции со списком карточек")
@RequestMapping("api/lists")
@CrossOrigin(origins = ["*"])
class ListController(
        @Autowired
        private val listRepository: ListRepository,
        @Autowired
        private val dashboardRepository: DashboardRepository
) {

//    @ApiOperation(value = "View a list of available languages", response = Iterable::class)
//    @ApiResponses(value = [
//        ApiResponse(code = 200, message = "Successfully retrieved list"),
//        ApiResponse(code = 401, message = "You are not authorized to view the resource"),
//        ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
//        ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
//    ])

    @GetMapping
    fun findAll(): MutableIterable<List> {
        return listRepository.findAll()
    }

    @GetMapping("/{id}")
    fun findById(@PathVariable("id") id: Long): ResponseEntity<List> {
        val entity = listRepository.findById(id)
        if (entity.isPresent) {
            return ResponseEntity(entity.get(), HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PostMapping
    fun create(@RequestBody details: @Valid ListDTO): ResponseEntity<Long> {
        val optional = dashboardRepository.findById(details.dashboardId)
        if (optional.isPresent) {
            val dashboard = optional.get()
            val list = List(name = details.name, description = details.description, dashboard = dashboard)
            val (id) = listRepository.save(list)
            return ResponseEntity(id, HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @PutMapping("/{id}")
    fun update(@PathVariable("id") id: Long, @RequestBody details: @Valid ListDTO): ResponseEntity<HttpStatus> {
        val entity = listRepository.findById(id)
        if (entity.isPresent) {
            val list = entity.get()
            list.name = details.name
            list.description = details.description
            // TODO: set list.dashboard by separate entrypoint
            listRepository.save(list)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable("id") id: Long): ResponseEntity<HttpStatus> {
        val entity = listRepository.findById((id))
        if (entity.isPresent) {
            listRepository.deleteById(id)
            return ResponseEntity(HttpStatus.OK)
        }
        return ResponseEntity(HttpStatus.NOT_FOUND)
    }
}