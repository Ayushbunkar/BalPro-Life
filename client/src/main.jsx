import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App.jsx'

if (typeof window !== 'undefined') {
  // Avoid duplicated raf loops during HMR updates.
  if (window.__lenisRafId) {
    cancelAnimationFrame(window.__lenisRafId)
    window.__lenisRafId = null
  }
  if (window.__lenisInstance) {
    window.__lenisInstance.destroy()
    window.__lenisInstance = null
  }

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    syncTouch: true,
    touchMultiplier: 1.2,
    wheelMultiplier: 0.95,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  })

  const raf = (time) => {
    lenis.raf(time)
    window.__lenisRafId = requestAnimationFrame(raf)
  }

  window.__lenisInstance = lenis
  window.__lenisRafId = requestAnimationFrame(raf)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
