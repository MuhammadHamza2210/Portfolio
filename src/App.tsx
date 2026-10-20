import { useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'

import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import AskHamza from './components/AskHamza'
import Footer from './components/Footer'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Services from './components/sections/Services'
import TechStack from './components/sections/TechStack'
import Contact from './components/sections/Contact'

export default function App() {
  const { theme, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [askOpen, setAskOpen] = useState(false)

  // ⌘K / Ctrl+K to open the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ambient backgrounds */}
      <div className="aurora" />
      <div className="grain" />

      <Cursor />

      <Navbar theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onToggleTheme={toggle} theme={theme} onOpenAsk={() => setAskOpen(true)} />

      <AskHamza open={askOpen} onOpenChange={setAskOpen} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
