import React, { useEffect, useMemo, useState } from 'react'
import { Home } from './pages/Home'
import { Privacy, Terms, About } from './pages/Legal'
import './App.css'
import { useAnalytics } from './hooks/useAnalytics'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // 页面浏览跟踪
  useEffect(() => {
    trackPageView(path)
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
