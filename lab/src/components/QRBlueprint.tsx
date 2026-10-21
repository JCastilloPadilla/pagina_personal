export default function QRBlueprint({ code }: { code: string }) {
  return (
    <>
    <svg className="qr-blueprint qr-blueprint-desktop" viewBox="0 0 640 450" role="img" aria-labelledby="qr-blueprint-title">
      <title id="qr-blueprint-title">De un enlace, una red WiFi o un contacto a un código QR personalizado</title>
      <text x="38" y="50" className="qr-blueprint-heading">De información a conexión.</text>
      <g className="qr-blueprint-wires" fill="none"><path d="M155 134H195Q211 134 211 150V211M155 225H250M155 316H195Q211 316 211 300V239M310 225H372" /><path className="qr-blueprint-packets" d="M155 134H195Q211 134 211 150V211M155 225H250M155 316H195Q211 316 211 300V239M310 225H372" /></g>
      {[['Enlace',134,'↗'],['WiFi',225,'⌁'],['Contacto',316,'@']].map(([label,y,icon])=><g key={label} transform={`translate(38 ${Number(y)-27})`}><rect width="117" height="54" rx="5" className="qr-blueprint-input" /><text x="17" y="33" className="qr-blueprint-symbol">{icon}</text><text x="47" y="32" className="qr-blueprint-label">{label}</text></g>)}
      <g transform="translate(250 195)"><rect width="60" height="60" rx="7" className="qr-blueprint-engine"/>{[0,1,2].flatMap(y=>[0,1,2].map(x=><rect key={`${x}-${y}`} x={16+x*10} y={16+y*10} width="7" height="7" rx="1" fill="white" opacity={x===1&&y===1?.4:1}/>))}</g>
      <text x="280" y="282" textAnchor="middle" className="qr-blueprint-note">A tu manera</text>
      <rect x="372" y="115" width="225" height="225" rx="5" fill="white" />
      <image href={code} x="382" y="125" width="205" height="205" />
      <text x="484" y="371" textAnchor="middle" className="qr-blueprint-label">Listo para escanear.</text>
      <path d="M38 401H602" className="qr-blueprint-rule" />
      <text x="38" y="426" className="qr-blueprint-note">Sin caducidad. Sin intermediarios.</text><text x="602" y="426" textAnchor="end" className="qr-blueprint-note">PNG / SVG</text>
    </svg>
    <svg className="qr-blueprint qr-blueprint-mobile" viewBox="0 0 360 440" role="img" aria-labelledby="qr-blueprint-mobile-title">
      <title id="qr-blueprint-mobile-title">Enlace, WiFi y contacto se transforman en un código QR personalizado</title>
      <text x="20" y="35" className="qr-blueprint-heading">De información a conexión.</text>
      <g className="qr-blueprint-wires" fill="none"><path d="M70 118V140Q70 150 80 150H180V177M180 118V177M290 118V140Q290 150 280 150H180M180 222V245"/><path className="qr-blueprint-packets" d="M70 118V140Q70 150 80 150H180V177M180 118V177M290 118V140Q290 150 280 150H180M180 222V245"/></g>
      {['Enlace','WiFi','Contacto'].map((label,index)=><g key={label} transform={`translate(${20+index*110} 74)`}><rect width="100" height="44" rx="5" className="qr-blueprint-input"/><text x="50" y="27" textAnchor="middle" className="qr-blueprint-label">{label}</text></g>)}
      <g transform="translate(158 177)"><rect width="44" height="44" rx="6" className="qr-blueprint-engine"/>{[0,1,2].flatMap(y=>[0,1,2].map(x=><rect key={`${x}-${y}`} x={11+x*8} y={11+y*8} width="6" height="6" rx="1" fill="white" opacity={x===1&&y===1?.4:1}/>))}</g>
      <text x="218" y="203" className="qr-blueprint-note">A tu manera</text>
      <rect x="93" y="245" width="174" height="174" rx="5" fill="white"/><image href={code} x="98" y="250" width="164" height="164"/>
    </svg>
    </>
  );
}
