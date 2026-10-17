export function SectionTitle({number,title}) {
  return <div className="flex items-center gap-3.5 mb-10">
    <span className="text-[#f4c430] font-oswald text-sm">{number} /</span>
    <h2 className="m-0 font-oswald text-3xl md:text-4xl font-bold tracking-wide">{title}</h2>
    <div className="section-line flex-1 ml-2 max-w-[500px]" />
  </div>
}
export function Button({children,to,onClick,primary=false}) {
  const cls=`inline-flex items-center justify-center gap-3 min-w-[170px] px-[22px] py-[15px] border font-oswald text-sm font-bold tracking-[1.5px] transition hover:-translate-y-1 ${primary?'text-[#111] bg-[#f4c430] border-[#f4c430] hover:bg-[#ffd84d]':'text-white bg-black/55 border-white/30 hover:text-[#f4c430] hover:border-[#f4c430]'}`
  return to ? <a href={to} className={cls}>{children}</a> : <button onClick={onClick} className={cls}>{children}</button>
}
export function PageWrap({children,className=''}) { return <section className={`w-[min(1400px,94%)] mx-auto py-20 md:py-[110px] ${className}`}>{children}</section> }
