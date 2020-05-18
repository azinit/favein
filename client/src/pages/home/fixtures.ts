import ScreenFaves from 'assets/faves.png'
import ScreenUser from 'assets/userpage.png'
import ScreenTooltips from 'assets/tooltips.png'
import ScreenMaterials from 'assets/materials.png'
import ScreenLabels from 'assets/labels.png'
import ScreenUsers from 'assets/users.png'
import ScreenMarkdown from 'assets/markdown-compability.png'
import ScreenDashboard from 'assets/dashboard.png'

type Screen = {
    img: string;
    label: string;
    description: string;
}

export const screens: Screen[] = [
    {
        img: ScreenFaves,
        label: "Избранное",
        description: "Можно добавлять понравившиеся карточки себе в избранное, чтобы не потерять",
    },
    {
        img: ScreenUser,
        label: "Собственное хранилище",
        description: "Можно хранить и делиться собственными подборками информации, статей и т.п.",
    },
    {
        img: ScreenTooltips,
        label: "Дружелюбный интерфейс",
        description: "Сервис разработан специально для комфортной и оперативной работы с информацией",
    },
    {
        img: ScreenUsers,
        label: "Комьюнити",
        description: "Можно посмотреть публичные заметки других пользователей",
    },
    {
        img: ScreenMaterials,
        label: "Материалы",
        description: "Все сделано для того, чтобы вы не потеряли нужные материалы",
    },
    {
        img: ScreenLabels,
        label: "Система меток",
        description: "В сервисе действует глобальная система меток, что позволяет удобнее идентифицировать карточки",
    },
    {
        img: ScreenMarkdown,
        label: "Markdown",
        description: "Сервис поддерживает систему Markdown (карточки, комментарии)",
    },
    {
        img: ScreenDashboard,
        label: "Собственный дашбоард",
        description: "Можете хранить, смотреть и изменять карточки в простом формате",
    },
]
