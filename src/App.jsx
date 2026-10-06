import {useEffect,useRef,useState} from 'react'
import {A} from './audio'

function useSeq(ds,onEnd){
  const [k,setK]=useState(0)
  useEffect(()=>{let t=0;const ids=ds.map((d,i)=>setTimeout(()=>setK(i+1),t+=d));return()=>ids.forEach(clearTimeout)},[])
  useEffect(()=>{if(k===ds.length&&onEnd)onEnd()},[k])
  return k
}
function Col({k,cls='',children}){
  const r=useRef()
  useEffect(()=>{r.current?.scrollIntoView({behavior:'smooth',block:'end'})},[k])
  return <div className={'col '+cls}>{children}<div ref={r}/></div>
}
function Type({text,speed=24,pause=600,onDone,cls=''}){
  const [n,setN]=useState(0)
  useEffect(()=>{
    if(n>=text.length){const id=setTimeout(()=>onDone&&onDone(),pause);return()=>clearTimeout(id)}
    const id=setTimeout(()=>{setN(n+1);if(n%3===0)A.tick()},speed);return()=>clearTimeout(id)
  },[n])
  return <span className={cls}>{text.slice(0,n)}<i className="cur"/></span>
}
function Ghost(){
  const [s,setS]=useState('█████')
  useEffect(()=>{
    A.ghost();let n=0
    const id=setInterval(()=>{n++
      setS(n>14?'GHOST':[...'GHOST'].map((c,i)=>n>i*2+4?c:'▓▒░█#%'[Math.random()*6|0]).join(''))
      if(n>14)clearInterval(id)},70)
    return()=>clearInterval(id)
  },[])
  return <span className="D ghost gl" data-t={s}>{s}</span>
}

function Boot({done}){
  const k=useSeq([900,1000,1000,1100,1900,1100],done)
  useEffect(()=>{if(k===2)A.ok();if(k===4)A.glitch()},[k])
  return <Col k={k} cls="ctr">
    <div className={k===4?'distort':''}>
      {k>=1&&k<=3&&<p className="in">&gt; INITIALIZING SECURE CONNECTION...</p>}
      {k>=2&&k<=3&&<p className="in g">&gt; CONNECTION ESTABLISHED</p>}
      {k===3&&<p className="in">&gt; ACCESSING AMITY CAMPUS NETWORK...<i className="cur"/></p>}
      {k===4&&<div className="warn"><div className="D h2 bad">WARNING</div><p>UNAUTHORIZED ACCESS DETECTED</p></div>}
    </div>
  </Col>
}
function Title({done}){
  const k=useSeq([500,2700,1000],done)
  useEffect(()=>{if(k===1)A.bass();if(k===2)A.glitch()},[k])
  return <Col k={k} cls="ctr">
    {k>=1&&k<=2&&<div className={k===2?'out':'in'}>
      <h1 className="D title gl" data-t="OPERATION">OPERATION</h1>
      <h1 className="D title gl" data-t="BLACKOUT">BLACKOUT<i className="cur big"/></h1>
      <p className="sig">[ GHOST // 0x00 ]</p>
    </div>}
  </Col>
}
function System({done}){
  const k=useSeq([500,900,900,900,900,1500,1400,2200],done)
  useEffect(()=>{if(k>=1&&k<=5)A.blip();if(k===7)A.ok()},[k])
  const rows=[['STATUS:',<span className="bad">COMPROMISED</span>],['',<span className="bad">UNAUTHORIZED ACCESS DETECTED</span>],['TRACE:','UNKNOWN'],['IDENTITY:','UNKNOWN'],['SIGNATURE:',<Ghost/>]]
  return <Col k={k}>
    {k>=1&&<div className="lab in">AMITY CAMPUS SECURITY SYSTEM</div>}
    {rows.map(([a,b],i)=>k>=i+2&&<div className="row in" key={i}><b>{a}</b> {b}</div>)}
    {k>=2&&k<7&&<div className="prog"><i/></div>}
    {k>=7&&<p className="D h2 g in" style={{marginTop:28}}>WELCOME, INVESTIGATORS.</p>}
  </Col>
}

const L=[
 {t:'Three days ago, the campus network experienced an unexplained breach.'},
 {t:'It lasted only a few seconds.'},
 {t:'No system was destroyed.\nNo data was visibly stolen.'},
 {t:'But something was left behind.',p:1100},
 {t:'A TRAIL.',c:'big',p:1800},
 {t:'Since then, strange digital traces have appeared across the campus.'},
 {t:'QR codes.',p:350},{t:'Encrypted messages.',p:350},{t:'Anonymous signals.',p:350},{t:'Hidden instructions.',p:900},
 {t:'Someone is deliberately leading us somewhere.'},
 {t:'We don\'t know who.\nWe don\'t know why.'},
 {t:'But we know one thing.',p:1400},
 {t:'THE TRAIL IS MEANT TO BE FOLLOWED.',c:'final',p:2400}
]
function Story({done}){
  const [i,setI]=useState(0)
  useEffect(()=>{if(i===L.length){const id=setTimeout(done,500);return()=>clearTimeout(id)}},[i])
  useEffect(()=>{if(i>0&&i<L.length)L[i].c?A.bass():A.blip()},[i])
  const cls=l=>'line '+(l.c||'')
  return <Col k={i} cls="tap">
    <div onClick={()=>i<L.length&&setI(i+1)} className="story">
      {L.slice(0,i).map((l,j)=><p key={j} className={cls(l)+(j<i-1?' dim':'')}>{l.t}</p>)}
      {i<L.length&&<p key={i} className={cls(L[i])}><Type text={L[i].t} speed={L[i].c?60:26} pause={L[i].p||650} onDone={()=>setI(i+1)}/></p>}
      {i<4&&<p className="hint">tap to speed up</p>}
    </div>
  </Col>
}
function Brief({done}){
  const k=useSeq([600,900,900,900,900,1500,1600,2300],done)
  useEffect(()=>{if(k>=1&&k<=5)A.blip();if(k===7)A.bass()},[k])
  const o=['Recover every fragment.','Follow the evidence.','Decode what you find.','Discover where the trail ends.']
  return <Col k={k}>
    {k>=1&&<div className="lab in">CLASSIFIED BRIEFING</div>}
    {k>=1&&<h2 className="D h2 in">YOUR OBJECTIVE</h2>}
    {o.map((t,i)=>k>=i+2&&<p className="line in" key={i}>{t}</p>)}
    {k>=6&&<p className="line g in" style={{marginTop:28}}>Your investigation begins now.</p>}
    {k>=7&&<h2 className="D big final in">YOUR FIRST TRACE IS ALREADY WAITING.</h2>}
  </Col>
}
function Trace(){
  const k=useSeq([600,1500,1800,1800,1900,1900,1500,2400,1300,1300])
  const [dep,setDep]=useState(false)
  useEffect(()=>{if(k>=2&&k<=5)A.blip();if(k===6)A.bass();if(k===7)A.whoosh();if(k===8||k===10)A.ok();if(k===9)A.glitch()},[k])
  const c=['The attacker was active late into the night.','Whoever was behind the breach needed to stay awake.','Your first trace is getting caffeinated.']
  return <Col k={k+(dep?1:0)}>
    {k>=1&&<div className="lab in">GHOST TRACE // 01</div>}
    {c.map((t,i)=>k>=i+2&&<p className="line in" key={i}>{t}</p>)}
    {k>=5&&<p className="line in"><b className="hl">Find what keeps tired minds running.</b></p>}
    {k>=6&&<h2 className="D big final in" data-t="GETTING CAFFEINATED.">GETTING CAFFEINATED.</h2>}
    {k>=7&&k<8&&<div className="prog fast in"><i/></div>}
    {k>=8&&<p className="row in g">&gt; TRACE 01 ACTIVE</p>}
    {k>=9&&<p className="row in">&gt; LOCATION UNKNOWN<br/>&gt; BEGIN SEARCH.</p>}
    {k>=10&&!dep&&<button className="D go in" onClick={()=>{setDep(true);A.glitch()}}>BEGIN INVESTIGATION</button>}
    {dep&&<div className="in dep"><p className="D h2 g">TRACE DEPLOYED.</p><p className="line">Follow the evidence.</p><p className="sig">[ GHOST // 0x00 ]</p></div>}
  </Col>
}

const SN=['01001001','01000001','0x4F2A','PACKET_CAPTURE','TRACE_FOUND','NODE_07','UNKNOWN_SOURCE','0xDEAD','GHOST_SIG // UNKNOWN','SRC 0.0.0.0']
function Bg(){
  const [s,setS]=useState(null)
  useEffect(()=>{const id=setInterval(()=>setS({t:SN[Math.random()*SN.length|0],x:Math.random()*70+5,y:Math.random()*80+8,k:Math.random()}),2200);return()=>clearInterval(id)},[])
  return <div className="bg" aria-hidden="true">
    <div className="grid"/>
    {s&&<span key={s.k} className="snip" style={{left:s.x+'%',top:s.y+'%'}}>{s.t}</span>}
    <div className="diag">AMITY CAMPUS NETWORK<br/>SECURITY NODE: ACTIVE<br/>ENCRYPTION: AES-256<br/>TRACE MONITORING: ONLINE<br/>PACKET ANALYSIS: ACTIVE</div>
  </div>
}
const Ic=({off})=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5z"/>{off?<path d="m22 9-6 6m0-6 6 6"/>:<path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>}</svg>

const SC=[Boot,Title,System,Story,Brief,Trace]
export default function App(){
  const [s,setS]=useState(0),[snd,setSnd]=useState(true),[rdy,setRdy]=useState(true)
  const wake=()=>A.init().then(()=>setRdy(A.ready()))
  useEffect(()=>{
    wake();const id=setTimeout(()=>setRdy(A.ready()),600)
    window.addEventListener('pointerdown',wake);return()=>{clearTimeout(id);window.removeEventListener('pointerdown',wake)}
  },[])
  useEffect(()=>{if(s>1)A.whoosh()},[s])
  const Sc=SC[s]
  return <div className="app scan">
    <Bg/>
    <div className="bar">
      {s<=4?<button onClick={()=>setS(s+1)}>SKIP ▸▸</button>:<span/>}
      <button onClick={()=>{A.init();A.mute(snd);setSnd(!snd)}} aria-label="Toggle sound"><Ic off={!snd}/> [ SOUND {snd?'ON':'OFF'} ]</button>
    </div>
    <main><Sc key={s} done={()=>setS(x=>x+1)}/></main>
    {!rdy&&<button className="gate" onClick={wake}>AUDIO LINK OFFLINE<br/>TAP TO ENABLE</button>}
  </div>
}
