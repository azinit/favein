package ru.itis.favein.controllers


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import ru.itis.favein.models.User
import ru.itis.favein.services.UserService


@Controller
@RequestMapping("/signup")
class SignUpController(
        @Autowired
        private val userService: UserService
) {

    @GetMapping
    fun index(): String {
        return "auth/signup"
    }

    @PostMapping
    fun addUser(
            user: User,
            model: Model
    ): String {
        println("BREAK-POINT")
        val userAdded: Boolean = userService.addUser(user)
        if (!userAdded) {
            model.addAttribute("error", "Пользователь с таким логином уже существует!")
            return "auth/signup"
        }
        return "redirect:/login"
    }
}
