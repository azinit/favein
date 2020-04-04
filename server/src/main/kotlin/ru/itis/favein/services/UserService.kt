package ru.itis.favein.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import ru.itis.favein.models.Role
import ru.itis.favein.models.User
import ru.itis.favein.repository.UserRepository
//import ru.itis.favein.repository.UserRepository
import java.util.*
import java.util.stream.Collectors

@Service
class UserService (
    @Autowired
    private val userRepository: UserRepository
) : UserDetailsService {
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        // FIXME: returns null...
        return userRepository.findByUsername(username)!!
    }
    // TODO: return response { success: { boolean } , error: { String } }
    fun addUser(user: User): Boolean {
        val userFromDb: User? = userRepository.findByUsername(user.username)
        // already exists
        if (userFromDb != null) {
            println("[${user.username}] is already registered!")
            return false
        }
        user.active = true
        user.roles = setOf(Role.USER)
        userRepository.save(user)
        println("[${user.username}] is successfully registered!")
        return true
    }

//    fun findAll(): List<User> {
//        return userRepository.findAll()
//    }

//    fun saveUser(user: User, username: String?, form: Map<String?, String?>) {
//        user.setUsername(username)
//        /* get roles */
//        val roles: Set<String> = Arrays.stream(Role.values())
//                .map(Role::name)
//                .collect(Collectors.toSet())
//        user.getRoles().clear()
//        for (key in form.keys) {
//            if (roles.contains(key)) {
//                user.getRoles().add(Role.valueOf(key))
//            }
//        }
//        userRepository.save(user)
//    }
//
//    fun updateProfile(user: User, password: String?, email: String?) {
//        val userEmail: String = user.getEmail()
//        val isEmailChanged = email != null && email != userEmail ||
//                userEmail != null && userEmail != email
//        if (isEmailChanged) {
//            user.setEmail(email)
//            // setActivationCode...
//        }
//        if (!StringUtils.isEmpty(password)) {
//            user.setPassword(password)
//        }
//        userRepository.save(user)
//        /*if (isEmailChanged) {
//            sendMessage(user);
//        }*/
//    }
//
//    val info: Any?
//        get() = null
//
//    // https://stackoverflow.com/questions/31159075/how-to-find-out-the-currently-logged-in-user-in-spring-boot
//// https://stackoverflow.com/questions/50355486/spring-boot-get-current-users-username
//    val currentUser: User
//        get() { // https://stackoverflow.com/questions/31159075/how-to-find-out-the-currently-logged-in-user-in-spring-boot
//            // https://stackoverflow.com/questions/50355486/spring-boot-get-current-users-username
//            val auth = SecurityContextHolder.getContext().authentication
//            return auth.principal as User
//        }
//
//    fun save(user: User?) {
//        userRepository.save(user)
//    }
}
