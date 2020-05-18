package ru.itis.favein.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import ru.itis.favein.models.Dashboard
import ru.itis.favein.repository.DashboardRepository

@Controller
@RequestMapping("fave")
class FaveController(
        @Autowired
        private val dashboardRepository: DashboardRepository
) {
    @GetMapping
    fun index(model: Model): String {
        model.addAttribute("dashboards", dashboardRepository.findAll())
        return "fave/index"
    }

    @PostMapping
    fun saveFave(
            @RequestParam link: String,
            @RequestParam dashboard: Dashboard
    ): String {
        println(link)
        return "redirect:/fave";
    }
}