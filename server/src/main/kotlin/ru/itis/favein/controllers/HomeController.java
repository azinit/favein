package ru.itis.favein.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping
    public String home(Model model) {
        model.addAttribute("user", "Martis");
        return "home/index";
    }
}
