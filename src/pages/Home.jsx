import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from '../assets/profil.png'
import { Button, PageWrap } from '../components/UI'

export default function Home(){
  const char=useRef(null), left=useRef(null), hero=useRef(null)
  useEffect(()=>{
    const c=char.current,h=hero.current,l=left.current
    if(!c||!h||!l) return
    const move=e=>{
      const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top
      c.style.transform=`perspective(1000px) rotateX(${((y/r.height)-.5)*-4}deg) rotateY(${((x/r.width)-.5)*5}deg) scale(1.015)`
      const hr=h.getBoundingClientRect(),hx=(e.clientX-hr.left)/hr.width-.5,hy=(e.clientY-hr.top)/hr.height-.5
      l.style.transform=`translate3d(${hx*-8}px,${hy*-5}px,0)`
    }
    const leave=()=>{c.style.transform='';l.style.transform=''}
    h.addEventListener('mousemove',move);h.addEventListener('mouseleave',leave)
    return()=>{h.removeEventListener('mousemove',move);h.removeEventListener('mouseleave',leave)}
  },[])
  return <>
    <section ref={hero} className="relative min-h-[calc(100vh-76px)] flex items-center overflow-hidden px-[3%] md:px-[5%] py-24">
      <div ref={left} className="relative z-20 w-full lg:w-[54%] pl-0 lg:pl-10 transition-transform duration-100">
        <div className="flex items-center gap-2.5 mb-6 text-[#71d95b] text-[13px] font-extrabold tracking-[3px]"><span className="w-2.5 h-2.5 rounded-full bg-[#71d95b] online-dot"/>ONLINE</div>
        <p className="relative pl-[18px] mb-4 font-oswald text-lg font-bold tracking-[3px] text-neutral-300 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-7 before:bg-[#f4c430]">PLAYER PROFILE</p>
        <h1 className="font-oswald text-[clamp(64px,9vw,135px)] leading-[.82] font-extrabold tracking-[-3px] text-neutral-100 drop-shadow-[5px_5px_0_rgba(0,0,0,.7)]">ABDULLOH<span className="block mt-5 text-[.48em] leading-none tracking-[4px] text-[#f4c430]">DEVELOPER</span></h1>
        <p className="max-w-[530px] my-8 text-[15px] leading-8 text-neutral-300">Zamonaviy, tezkor va kreativ web-saytlar yaratadigan frontend developer.</p>
        <div className="flex flex-wrap gap-3">
          <Button to="/projects" primary>VIEW PROJECTS <span>↗</span></Button>
          <Button to="/contact">CONTACT ME</Button>
        </div>
      </div>
      <div ref={char} className="absolute right-[-16%] md:right-[-5%] bottom-0 w-[70%] lg:w-[58%] h-[88%] lg:h-[94%] z-10 flex items-end justify-center transition-transform duration-150 pointer-events-none">
        <div className="character-glow absolute right-[15%] bottom-[15%] w-[500px] h-[500px] rounded-full z-0"/>
        <img src={profile} alt="Abdulloh PUBG Character" className="relative z-10 w-[70%] md:w-[60%] lg:w-[54%] h-full object-contain object-bottom"/>
      </div>
      <div className="absolute left-[5%] bottom-8 z-30 w-[90%] md:w-[600px] flex p-[18px_25px] bg-gradient-to-r from-[#070908]/98 to-[#070908]/75] border border-[#f4c430]/35 clip-hud">
        {[['KILLS','256'],['WINS','56'],['K/D','4.35'],['RANK','TOP 100']].map(([a,b])=><div key={a} className="flex-1 text-center border-r last:border-0 border-white/15"><small className="block mb-1 text-[10px] tracking-[2px] text-neutral-500 font-oswald">{a}</small><strong className="text-[#f4c430] font-oswald text-xl md:text-2xl">{b}</strong></div>)}
      </div>
    </section>
    <PageWrap className="py-0">
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-white/10">
        {[['LEVEL','99'],['PROJECTS','12+'],['EXPERIENCE','2+'],['STATUS','ONLINE']].map(([a,b])=><div key={a} className="p-7 text-center border-r last:border-0 border-white/10 bg-[#0e0f0e]/60"><span className="block mb-2 font-oswald text-[11px] tracking-[2px]">{a}</span><strong className={`font-oswald text-2xl ${a==='STATUS'?'text-[#71d95b]':''}`}>{b}</strong></div>)}
      </div>
    </PageWrap>
  </>
}
