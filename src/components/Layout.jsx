import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const nav = [
  ['HOME', '/'],
  ['PROFILE', '/profile'],
  ['SKILLS', '/skills'],
  ['PROJECTS', '/projects'],
  ['CONTACT', '/contact'],
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => setOpen(false), [location.pathname])

  const particles = useMemo(() => Array.from({ length: 32 }, (_, i) => ({
    id: i, left: `${Math.random()*100}%`, bottom: `${Math.random()*100}%`,
    duration: `${7+Math.random()*12}s`, delay: `${Math.random()*-15}s`,
    opacity: .15 + Math.random()*.55,
  })), [])

  return (
    <div className="min-h-screen">
      <div className="site-bg" />
      <div className="site-overlay" />
      <div className="scanline" />
      <div className="hud-corner hud-tl" /><div className="hud-corner hud-tr" />
      <div className="hud-corner hud-bl" /><div className="hud-corner hud-br" />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {particles.map(p => <span key={p.id} className="particle" style={{left:p.left,bottom:p.bottom,animationDuration:p.duration,animationDelay:p.delay,opacity:p.opacity}} />)}
      </div>

      <header className="fixed top-0 left-0 right-0 h-[76px] z-50 flex items-center justify-between px-[5%] bg-[#050707]/90 backdrop-blur-xl border-b border-white/10">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
          <img src={logo} alt="PUBG logo" className="w-[50px]" />
          <span className="flex flex-col leading-[.9] font-oswald">
            <strong className="text-[22px] text-[#f4c430]">PUBG</strong>
            <span className="text-[10px] text-neutral-400 tracking-[2px]">PORTFOLIO</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map(([label,path]) => (
            <NavLink key={path} to={path} end={path === '/'}
              className={({isActive}) => `relative py-7 font-oswald text-sm tracking-[1.5px] transition ${isActive ? 'text-[#f4c430] after:absolute after:left-0 after:right-0 after:bottom-[17px] after:h-[3px] after:bg-[#f4c430]' : 'text-neutral-400 hover:text-[#f4c430]'}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <div className="w-[42px] h-[42px] grid place-items-center text-[#f4c430] border border-[#f4c430] text-[22px]">★</div>
          <div><strong className="block font-oswald text-sm">ABDULLOH</strong><span className="block text-[#f4c430] text-[9px] tracking-[1px]">CONQUEROR</span></div>
          <div className="px-2 py-1.5 border border-neutral-600 font-oswald text-xs">LV.99</div>
        </div>

        <button aria-label="Menu" onClick={() => setOpen(v=>!v)} className="lg:hidden text-3xl text-white bg-transparent border-0">{open ? '✕' : '☰'}</button>
      </header>

      {open && <nav className="fixed top-[76px] left-0 right-0 z-40 bg-[#080a09]/98 border-b border-[#f4c430] lg:hidden">
        {nav.map(([label,path]) => <NavLink key={path} to={path} end={path==='/'}
          className="block px-8 py-[18px] text-white font-oswald border-b border-white/10 hover:text-[#f4c430]">{label}</NavLink>)}
      </nav>}

      <main className="pt-[76px]"><Outlet /></main>

      <footer className="border-t border-white/10 px-[5%] py-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-neutral-500 font-oswald tracking-[1px]">
        <div>© 2026 ABDULLOH</div><div>PLAYER #001</div><div className="text-[#71d95b]">● SYSTEM ONLINE</div>
      </footer>
    </div>
  )
}
