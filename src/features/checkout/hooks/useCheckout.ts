import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'

import { diContainer } from '@infra/di'

import { checkoutServiceToken } from '../di'
import type { OrderInput } from '../model'

export const useCheckout = ({ onSuccess }: { onSuccess: () => void }) => {
    const checkoutService = diContainer.get(checkoutServiceToken)
    const submitting = useRef(false)
    const mutation = useMutation({
        mutationFn: (input: OrderInput) => checkoutService.placeOrder(input),
        onSuccess,
    })

    const placeOrder = async (input: OrderInput): Promise<void> => {
        // Защищает от двух вызовов до следующего рендера.
        if (submitting.current) return
        submitting.current = true
        try {
            await mutation.mutateAsync(input)
        } catch {
            // Ошибка доступна через состояние mutation.
        } finally {
            submitting.current = false
        }
    }

    return {
        reset: () => {
            if (submitting.current) return false
            mutation.reset()
            return true
        },
        placeOrder,
        isSubmitting: mutation.isPending,
        error: mutation.isError ? 'Не удалось оформить заказ. Попробуйте ещё раз.' : null,
        orderId: mutation.data?.id ?? null,
    }
}
