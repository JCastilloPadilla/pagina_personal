import { useEffect, useState, type CSSProperties } from 'react';

const nodes = [
  {name:'Equipos', x:90, y:210, mx:80, my:90, title:'Todo empieza en un equipo.', copy:'Los equipos son el punto de partida: cada uno aporta información para entender el estado de la red.'},
  {name:'Agente', x:270, y:210, mx:290, my:90, title:'Una pieza cerca del origen.', copy:'El agente instalado en cada equipo reúne la telemetría que después se consulta desde FlowTrix.'},
  {name:'FlowTrix', x:460, y:210, mx:200, my:265, title:'Conectar las piezas.', copy:'La información de los agentes se reúne en un solo lugar para recorrer la red con más contexto.'},
  {name:'Alertas', x:670, y:90, mx:80, my:440, title:'Saber dónde poner atención.', copy:'Las alertas ayudan a encontrar lo que necesita revisión entre la actividad de los equipos.'},
  {name:'Históricos', x:670, y:330, mx:320, my:440, title:'Mirar también hacia atrás.', copy:'Los históricos permiten consultar la actividad registrada y seguir lo que ha pasado en el tiempo.'},
];
const desktopPaths = ['M90 210H270','M270 210H460','M460 210H550Q570 210 570 190V110Q570 90 590 90H670','M460 210H550Q570 210 570 230V310Q570 330 590 330H670'];
const mobilePaths = ['M80 90H290','M290 90V170Q290 190 270 190H220Q200 190 200 210V265','M200 265V345Q200 365 180 365H100Q80 365 80 385V440','M200 265V345Q200 365 220 365H300Q320 365 320 385V440'];

export default function FlowNetwork() {
  const [selected, setSelected] = useState(2);
  const [ready, setReady] = useState(false);
  useEffect(()=>setReady(true),[]);
  const current = nodes[selected];
  const activePaths = selected === 2 ? [0,1,2,3] : selected === 0 ? [0] : selected === 1 ? [0,1] : selected === 3 ? [1,2] : [1,3];
  return (
    <div className="flow-network">
      <div className="flow-network-note"><p>Una red. Muchas señales.</p><span className="flow-network-brand">FlowTrix<span className="title-stop">.</span></span><a className="flow-network-action" href="https://flowtrix.fimaz.uas.edu.mx/">Explorar FlowTrix ↗</a><span className="flow-network-hint">Selecciona una pieza <span aria-hidden="true">↴</span></span></div>
      <div className="flow-map" role="group" aria-label="Explorar el recorrido de la información en FlowTrix">
        {[false,true].map(mobile=><svg key={String(mobile)} className={`flow-links ${mobile?'flow-links-mobile':'flow-links-desktop'}`} viewBox={mobile?'0 0 400 530':'0 0 760 420'} preserveAspectRatio="none" fill="none" aria-hidden="true">{(mobile?mobilePaths:desktopPaths).map((path,index)=><g key={`${selected}-${index}`}><path d={path} className="flow-wire" /><path d={path} className={`flow-packet ${activePaths.includes(index)?'is-active':''}`} /></g>)}</svg>)}
        {nodes.map((node,index)=><button key={node.name} type="button" disabled={!ready} className={`flow-node ${index===2?'flow-node-hub':''}`} aria-pressed={selected===index} aria-controls="flow-detail" onClick={()=>setSelected(index)} style={{'--node-x':`${node.x/7.6}%`,'--node-y':`${node.y/4.2}%`,'--node-mx':`${node.mx/4}%`,'--node-my':`${node.my/5.3}%`} as CSSProperties}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            {index===0?<><rect x="3" y="4" width="22" height="15" rx="2"/><path d="M9 24h10M14 19v5"/></>:index===1?<><rect x="6" y="6" width="16" height="16" rx="3"/><path d="M10 2v4m8-4v4M10 22v4m8-4v4M2 10h4m-4 8h4m16-8h4m-4 8h4"/><rect x="11" y="11" width="6" height="6"/></>:index===2?<><path d="m14 2 11 6v12l-11 6-11-6V8zM3 8l11 6 11-6M14 14v12"/><path d="m8 5 12 6"/></>:index===3?<><path d="M7 10a7 7 0 0 1 14 0c0 8 3 9 3 9H4s3-1 3-9ZM11 23a3 3 0 0 0 6 0"/><path d="M14 8v5m0 2v1"/></>:<><circle cx="14" cy="14" r="10"/><path d="M14 7v7l5 3M3 5v6h6"/></>}
          </svg>
          <span>{node.name}</span>
          <span className="flow-node-select" aria-hidden="true">{selected===index?'−':'+'}</span>
        </button>)}
      </div>
      <div id="flow-detail" className="flow-detail" aria-live="polite" aria-atomic="true"><h4>{current.title}</h4><p>{current.copy}</p></div>
      <p className="flow-schematic-note">Esquema interactivo del proyecto · Sin datos de monitoreo en vivo.</p>
    </div>
  );
}
