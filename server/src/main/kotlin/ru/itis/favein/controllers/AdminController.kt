package ru.itis.favein.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import ru.itis.favein.repository.DashboardRepository
import ru.itis.favein.repository.LabelRepository
import ru.itis.favein.repository.UserRepository

@Controller
@RequestMapping("/admin")
class AdminController(
        @Autowired
        private val labelRepo: LabelRepository,
        @Autowired
        private val userRepo: UserRepository,
        @Autowired
        private val dashboardRepo: DashboardRepository
) {
    @GetMapping
    fun index(model: Model): String {
        model.addAttribute("labels", labelRepo.findAll())
        model.addAttribute("users", userRepo.findAll())
        model.addAttribute("boards", dashboardRepo.findAll())
        return "admin/index"
    }
}