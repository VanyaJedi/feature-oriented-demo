import type { QueryClient } from '@tanstack/react-query'

import { createToken } from '@infra/di'

export const queryClientToken = createToken<QueryClient>('queryClient')
