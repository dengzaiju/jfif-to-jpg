import React, { useEffect, useMemo, useState } from 'react'
import { Home } from './pages/Home'
import { Privacy, Terms, About } from './pages/Legal'
import { useAnalytics } from './hooks/useAnalytics'
import './App.css'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // 跟踪页面浏览
  useEffect(() => {
    const pageName = path === '/' ? 'home' : path.slice(1)
    trackPageView(pageName)
  }, [path, trackPageView])

  const navigate = (to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
      setPath(to)
      window.scrollTo({ top: 0 })
    }
  }

  const Page = useMemo(() => {
    if (path === '/privacy') return <Privacy />
    if (path === '/terms') return <Terms />
    if (path === '/about') return <About />
    return <Home />
  }, [path])

  return (
    <div className="App">
      {Page}
    </div>
  )
}

export default App
