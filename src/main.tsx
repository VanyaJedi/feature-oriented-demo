import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

import { App } from '@app/App'
import { registerApplicationServices } from '@app/di'
import { diContainer } from '@infra/di'
import { queryClientToken } from '@infra/query'
import { getBrowserDocument } from '@shared/platform'

import './styles.css'

registerApplicationServices()

const rootElement = getBrowserDocument()?.getElementById('root')

if (!rootElement) {
    throw new Error('The application requires a browser root element')
}

createRoot(rootElement).render(
    <StrictMode>
        <QueryClientProvider client={diContainer.get(queryClientToken)}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
)
