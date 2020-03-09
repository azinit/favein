package ru.itis.favein.controllers

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/admin")
class AdminController {
    @GetMapping
    fun index(model: Model): String {
        return "admin/index"
    }
}