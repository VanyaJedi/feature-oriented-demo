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
