package ru.itis.favein.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import ru.itis.favein.repository.*

@Controller
@RequestMapping("/admin")
class AdminController(
        @Autowired
        private val labelRepo: LabelRepository,
        @Autowired
        private val userRepo: UserRepository,
        @Autowired
        private val dashboardRepo: DashboardRepository,
        @Autowired
        private val listRepo: ListRepository,
        @Autowired
        private val cardRepo: CardRepository
) {
    @GetMapping
    fun index(model: Model): String {
        model.addAttribute("labels", labelRepo.findAll())
        model.addAttribute("users", userRepo.findAll())
        model.addAttribute("boards", dashboardRepo.findAll())
        model.addAttribute("lists", listRepo.findAll())
        model.addAttribute("cards", cardRepo.findAll())
        return "admin/index"
    }
}