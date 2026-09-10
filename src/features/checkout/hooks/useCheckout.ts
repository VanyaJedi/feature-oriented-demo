import { useState } from 'react'

import { diContainer } from '@infra/di'

import { checkoutServiceToken } from '../di'
import type { OrderInput } from '../model'

export const useCheckout = ({ onSuccess }: { onSuccess: () => void }) => {
    const checkoutService = diContainer.get(checkoutServiceToken)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [orderId, setOrderId] = useState<string | null>(null)

    const placeOrder = async (input: OrderInput): Promise<void> => {
        if (isSubmitting) return
        setIsSubmitting(true)
        setError(null)
        setOrderId(null)
        try {
            const order = await checkoutService.placeOrder(input)
            setOrderId(order.id)
            onSuccess()
        } catch {
            setError('Не удалось оформить заказ. Попробуйте ещё раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        reset: () => {
            if (isSubmitting) return false
            setError(null)
            setOrderId(null)
            return true
        },
        placeOrder,
        isSubmitting,
        error,
        orderId,
    }
}
