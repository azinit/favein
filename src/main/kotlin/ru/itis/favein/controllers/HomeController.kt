package ru.itis.favein.controllers

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class HomeController {
    @GetMapping
    fun index(model: Model): String {
        return "home/index"
    }
}