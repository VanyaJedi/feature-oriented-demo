import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@app/App'
import { registerApplicationServices } from '@app/di'
import { getBrowserDocument } from '@shared/platform'

import './styles.css'

registerApplicationServices()

const rootElement = getBrowserDocument()?.getElementById('root')

if (!rootElement) {
    throw new Error('The application requires a browser root element')
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
