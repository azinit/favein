package ru.itis.favein.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import ru.itis.favein.repository.LabelRepository

@Controller
@RequestMapping("/admin")
class AdminController(
        @Autowired
        private val repository: LabelRepository
) {
    @GetMapping
    fun index(model: Model): String {
        model.addAttribute("labels", repository.findAll())
        return "admin/index"
    }
}