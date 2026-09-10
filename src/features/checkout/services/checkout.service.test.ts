import { expect, it } from 'vitest'

import { CheckoutService } from './checkout.service'

it('включает доставку в итоговую сумму', () => {
    const checkout = new CheckoutService({
        deliveryPriceProvider: {
            calculate: () => 150,
        },
    })

    expect(checkout.createSummary([{
        id: 1,
        title: 'Книга',
        category: 'Книги',
        description: 'Учебник',
        emoji: '📚',
        price: 1000,
    }])).toEqual({
        items: [{ id: 1, title: 'Книга', price: 1000, quantity: 1 }],
        subtotal: 1000,
        delivery: 150,
        total: 1150,
    })
})

it('оформляет заказ с рассчитанной доставкой и выдаёт разные номера', async () => {
    const checkout = new CheckoutService({ deliveryPriceProvider: { calculate: () => 150 } })
    const input = { products: [{ id: 1, title: 'Книга', category: 'Книги', description: '', emoji: '📚', price: 1000 }] }
    const first = await checkout.placeOrder(input)
    const second = await checkout.placeOrder(input)
    expect(first.summary).toMatchObject({ subtotal: 1000, delivery: 150, total: 1150 })
    expect(first.id).not.toBe(second.id)
})

it('отклоняет пустой заказ и некорректные цены', async () => {
    const checkout = new CheckoutService({ deliveryPriceProvider: { calculate: () => 150 } })
    await expect(checkout.placeOrder({ products: [] })).rejects.toThrow('Заказ не должен быть пустым')
    for (const price of [-1, NaN, Infinity]) {
        await expect(checkout.placeOrder({ products: [{ id: 1, title: 'Книга', category: '', description: '', emoji: '', price }] })).rejects.toThrow('Некорректная цена')
    }
})

it('передаёт ошибку расчёта вызывающему коду', async () => {
    const checkout = new CheckoutService({ deliveryPriceProvider: { calculate: () => { throw new Error('Delivery unavailable') } } })
    await expect(checkout.placeOrder({ products: [{ id: 1, title: 'Книга', category: '', description: '', emoji: '', price: 1000 }] })).rejects.toThrow('Delivery unavailable')
})
