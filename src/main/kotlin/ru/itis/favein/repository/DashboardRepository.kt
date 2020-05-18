package ru.itis.favein.repository

import org.springframework.data.repository.CrudRepository
import ru.itis.favein.models.Dashboard

interface DashboardRepository: CrudRepository<Dashboard, Long> {
}