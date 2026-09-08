import type { Product } from './product.types'

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        title: 'Умная колонка',
        category: 'Электроника',
        description: 'Компактная колонка с чистым звуком и голосовым управлением.',
        emoji: '🔊',
        price: 6490,
    },
    {
        id: 2,
        title: 'Настольная лампа',
        category: 'Дом',
        description: 'Тёплый свет, сенсорная регулировка и лаконичный корпус.',
        emoji: '💡',
        price: 2790,
    },
    {
        id: 3,
        title: 'Городской рюкзак',
        category: 'Аксессуары',
        description: 'Вместительный рюкзак с отделением для ноутбука.',
        emoji: '🎒',
        price: 4190,
    },
    {
        id: 4,
        title: 'Термокружка',
        category: 'Посуда',
        description: 'Сохраняет температуру напитка и не протекает в сумке.',
        emoji: '☕',
        price: 1690,
    },
    {
        id: 5,
        title: 'Беспроводные наушники',
        category: 'Электроника',
        description: 'Активное шумоподавление и до 30 часов работы.',
        emoji: '🎧',
        price: 8990,
    },
    {
        id: 6,
        title: 'Плед из хлопка',
        category: 'Дом',
        description: 'Мягкий фактурный плед для дивана или спальни.',
        emoji: '🧶',
        price: 3290,
    },
]
