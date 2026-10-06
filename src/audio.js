// Web Audio synth: no audio files needed, works as a static deploy.
let ctx,mst,nbuf
const ready=()=>!!ctx&&ctx.state==='running'
const now=()=>ctx.currentTime
function env(g,v,d,a=.005){const t=now();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+d)}
function tone(f,d,type='sine',v=.05,f2){if(!ready())return
  const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,now())
  if(f2)o.frequency.exponentialRampToValueAtTime(f2,now()+d)
  env(g,v,d);o.connect(g).connect(mst);o.start();o.stop(now()+d+.05)}
function noise(d,v,type='bandpass',f=1000,f2){if(!ready())return
  const s=ctx.createBufferSource(),b=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=nbuf;b.type=type;b.frequency.setValueAtTime(f,now())
  if(f2)b.frequency.exponentialRampToValueAtTime(f2,now()+d)
  env(g,v,d,.02);s.connect(b).connect(g).connect(mst);s.start();s.stop(now()+d+.05)}
function hum(){const g=ctx.createGain();g.gain.value=.06;g.connect(mst)
  ;[[55,'sine',1],[82.5,'triangle',.4]].forEach(([f,t,m])=>{const o=ctx.createOscillator(),x=ctx.createGain();o.type=t;o.frequency.value=f;x.gain.value=m;o.connect(x).connect(g);o.start()})
  const s=ctx.createBufferSource(),b=ctx.createBiquadFilter(),x=ctx.createGain();s.buffer=nbuf;s.loop=true;b.type='bandpass';b.frequency.value=600;x.gain.value=.5;s.connect(b).connect(x).connect(g);s.start()}
export const A={
  init(){if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();mst=ctx.createGain();mst.connect(ctx.destination)
    nbuf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const d=nbuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;hum()}
    return ctx.resume().catch(()=>{})},
  ready,
  mute(m){if(mst)mst.gain.value=m?0:1},
  tick(){noise(.025,.05,'highpass',3500)},
  blip(){tone(920,.06,'square',.018)},
  ok(){tone(660,.1,'sine',.05);setTimeout(()=>tone(990,.16,'sine',.05),90)},
  glitch(){noise(.45,.12,'bandpass',3000,200);tone(70,.3,'sawtooth',.04,40)},
  bass(){tone(95,1.8,'sine',.5,30);noise(1.6,.15,'lowpass',200,40)},
  ghost(){tone(140,1,'sawtooth',.05,60);tone(143,1,'square',.03,58);noise(.5,.06,'bandpass',1800,300)},
  whoosh(){noise(.7,.07,'lowpass',200,2400)}
}
