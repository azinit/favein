package ru.itis.favein.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class MvcConfig : WebMvcConfigurer {
//    @Value("\${upload.path}")
//    private val uploadPath: String? = null

    override fun addViewControllers(registry: ViewControllerRegistry) {
        //        registry.addViewController("/home").setViewName("home");
        //        registry.addViewController("/").setViewName("home");
        //        registry.addViewController("/hello").setViewName("hello");
        registry.addViewController("/login").setViewName("auth/login")
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        //        registry.addResourceHandler("/uploads")
        //                .addResourceLocations("classpath:/uploads");
        //        registry.addResourceHandler("/uploads/**")
        //                .addResourceLocations("file://$uploadPath/")
        //        registry.addResourceHandler(("/static/**"))
        //                .addResourceLocations("classpath:/static/");
    }
}