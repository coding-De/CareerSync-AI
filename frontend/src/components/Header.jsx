import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router'

// Token system
// Ink:        #16233F  (wordmark, headings)
// Paper:      #FAFAF8  (navbar surface)
// Line:       #E4E1D8  (hairline border)
// Slate:      #5C6470  (secondary text / inactive links)
// Accent:     #1F7A5C  (sync green — active state, CTA)
// Accent-soft:#E8F2ED  (accent tint background)
//
// Plain CSS only — no Tailwind, no icon library. Works in any React setup.

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'All Interviews', href: '/all-interviews' },
]

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('/')
  const [pulse, setPulse] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const handlelogout = () => {
        axios.post(`${import.meta.env.VITE_SERVICE_PATH}auth/logout`, {}, {
            withCredentials: true
        }).then((res) => {
            localStorage.removeItem('login')
            navigate('/login')
        }).catch((err) => {
            console.error('Logout failed:', err)
        })
    }

  return (
    <header className="csa-header">

      <div className="csa-inner">
        <a href="/" className="csa-logo" onClick={() => setActive('/')}>
          <span className="csa-logo-text">CareerSync</span>
          <span className="csa-logo-ai">
            <span className="csa-dot-wrap" aria-hidden="true">
              <span className={`csa-dot-ping ${pulse ? 'pulse' : ''}`} />
              <span className="csa-dot-core" />
            </span>
            <span className="csa-ai-label">AI</span>
          </span>
        </a>

        <nav className="csa-nav-desktop" aria-label="Primary">
          {links.map((link) => {
            const isActive = active === link.href
            return (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setActive(link.href)}
                className={`csa-nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
                {isActive && <span className="csa-active-indicator" />}
              </NavLink>
            )
          })}
        </nav>

        <div className="csa-actions-desktop">
         {!localStorage.getItem('login') ? (
            <a href="/login" className="csa-login-link">Log in</a>
          ) : (
            <div className="csa-cta" onClick={handlelogout}>
              logout
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="csa-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="csa-mobile-panel">
          <nav className="csa-mobile-nav" aria-label="Mobile">
            {links.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActive(link.href)
                    setOpen(false)
                  }}
                  className={`csa-mobile-link ${isActive ? 'active' : ''}`}
                >
                  {isActive && <span className="csa-mobile-active-dot" />}
                  {link.label}
                </a>
              )
            })}
            <div className="csa-mobile-actions">
              <a href="/login" className="csa-mobile-login">Log in</a>
              <a href="/signup" className="csa-mobile-cta">Get started</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header