import React, {useState} from 'react';
import { AUTOS } from './data_autos';
import { WHATSAPP_NUMBER, THEME } from './config';

function waLink(text){
  const base = WHATSAPP_NUMBER && WHATSAPP_NUMBER.length>0 ? `https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER.replace('+',''))}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}

export default function App(){
  const [q,setQ] = useState('');
  const [selected,setSelected] = useState(null);
  const results = AUTOS.filter(a =>
    a.title.toLowerCase().includes(q.toLowerCase()) ||
    a.variant.toLowerCase().includes(q.toLowerCase()) ||
    a.year.toString().includes(q)
  );

  return (
    <div>
      <header className="container">
        <div className="header">
          <div className="logo">
            <div className="mark">LH</div>
            <div>
              <div style={{fontWeight:700,fontSize:18}}>LH Automotores</div>
              <div style={{fontSize:13,color:'#666'}}>Compra • Venta • Financiación</div>
            </div>
          </div>
          <nav className="nav">
            <a href="#autos">Autos en venta</a>
            <a href="#sobre">Sobre nosotros</a>
            <a href="#contacto" className="btn" style={{marginLeft:12}}>Contacto</a>
          </nav>
        </div>

        <section className="hero">
          <div style={{flex:1}}>
            <h1 style={{margin:0,fontSize:30}}>Encontrá tu próximo auto con <span style={{color:'var(--primary)'}}>LH Automotores</span></h1>
            <p style={{color:'#555'}}>Transparencia, financiación y asesoramiento profesional.</p>

            <div style={{marginTop:12,display:'flex',gap:8}}>
              <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por modelo, año o versión" />
              <button onClick={()=>setQ('')} className="btn">Limpiar</button>
              <a href={waLink('Hola LH Automotores, quiero vender mi vehículo')} className="btn" style={{background:'#eef2ff',color:'var(--primary)',fontWeight:700}}>WhatsApp</a>
            </div>
          </div>

          <div style={{width:420}}>
            <div className="card" style={{overflow:'hidden'}}>
              <img src={AUTOS[0].image_remote} alt="hero" style={{width:'100%',height:220,objectFit:'cover'}} />
              <div style={{padding:12}}>
                <div style={{fontWeight:700}}>Tasación rápida</div>
                <div style={{color:'#666',marginTop:6}}>En 15 minutos sabés cuánto podés obtener por tu vehículo.</div>
                <a href={waLink('Hola LH Automotores, quiero tasar mi auto')} style={{marginTop:8,display:'inline-block'}}>Contactanos</a>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main className="container">
        <section id="autos" style={{marginTop:18}}>
          <h2>Autos en venta</h2>
          <div className="grid cols-3" style={{marginTop:12}}>
            {results.map(car => (
              <article key={car.id} className="card autocard">
                <img src={car.image_local || car.image_remote} alt={car.title} onError={(e)=>{e.target.src=car.image_remote}} />
                <div style={{padding:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontWeight:700}}>{car.title} {car.variant}</div>
                    <div className="badge">{car.year}</div>
                  </div>
                  <div style={{color:'var(--primary)',fontWeight:800,marginTop:8}}>ARS ${car.price_ars} • USD ${car.price_usd}</div>
                  <div style={{color:'#666',marginTop:8}}>{car.km}</div>
                  <div style={{marginTop:8,color:'#444'}}>{car.desc}</div>
                  <div style={{marginTop:12,display:'flex',gap:8}}>
                    <button onClick={()=>setSelected(car)} className="btn">Ver detalle</button>
                    <a href={waLink('Hola LH Automotores, consulto por el auto '+car.title)} target="_blank" rel="noreferrer">WhatsApp</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {selected && (
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
            <div style={{background:'white',borderRadius:12,maxWidth:900,width:'100%',overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
                <img src={selected.image_remote} alt={selected.title} style={{width:'100%',height:360,objectFit:'cover'}} />
                <div style={{padding:18}}>
                  <h3 style={{fontSize:20,fontWeight:700}}>{selected.title} {selected.variant}</h3>
                  <div style={{color:'var(--primary)',fontWeight:700,marginTop:8}}>ARS ${selected.price_ars} • USD ${selected.price_usd}</div>
                  <div style={{color:'#666',marginTop:8}}>Año: {selected.year} • {selected.km}</div>
                  <p style={{marginTop:12}}>{selected.desc}</p>
                  <div style={{marginTop:14,display:'flex',gap:8}}>
                    <a href={waLink('Hola LH Automotores, quiero agendar visita para '+selected.title)} className="btn">Agendar visita</a>
                    <a href={waLink('Hola LH Automotores, consulto por el auto '+selected.title)} target="_blank" rel="noreferrer">WhatsApp</a>
                    <button onClick={()=>setSelected(null)} style={{padding:10}}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section id="sobre" style={{marginTop:28}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'center'}}>
            <div>
              <h2>Sobre LH Automotores</h2>
              <p style={{color:'#555'}}>Somos un equipo local con foco en venta y financiación responsable. Asesoramos y hacemos la gestión completa para que vendas o compres tranquilo.</p>
              <ul style={{marginTop:8,color:'#555'}}>
                <li>• Garantía mínima</li>
                <li>• Tasación gratuita</li>
                <li>• Financiación a medida</li>
              </ul>
            </div>
            <div>
              <img src={AUTOS[1].image_remote} alt="sobre" style={{width:'100%',height:220,objectFit:'cover',borderRadius:10}} />
            </div>
          </div>
        </section>

        <section id="financiacion" style={{marginTop:28,background:'white',padding:18,borderRadius:10}}>
          <h2>Financiación</h2>
          <p style={{color:'#555'}}>Ofrecemos planes con entradas y cuotas en pesos o dólares, sujetas a evaluación.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:12}}>
            <div style={{padding:12,borderRadius:8,border:'1px solid #eee'}}> <strong>Plan Básico</strong><div style={{color:'#666'}}>Entrada baja • Hasta 12 meses</div></div>
            <div style={{padding:12,borderRadius:8,border:'1px solid #eee'}}> <strong>Plan Plus</strong><div style={{color:'#666'}}>Cuotas accesibles • Hasta 24 meses</div></div>
            <div style={{padding:12,borderRadius:8,border:'1px solid #eee'}}> <strong>Plan Premium</strong><div style={{color:'#666'}}>Planes a medida</div></div>
          </div>
        </section>

        <footer id="contacto" style={{marginTop:28}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,alignItems:'start'}}>
            <div>
              <h3>Contacto</h3>
              <div style={{color:'#666',marginTop:6}}>Whatsapp: <a href={WHATSAPP_NUMBER ? ('https://wa.me/'+encodeURIComponent(WHATSAPP_NUMBER.replace('+',''))) : '#'}>{WHATSAPP_NUMBER || 'Agregá tu número en src/config.js'}</a></div>
              <div style={{color:'#666'}}>Dirección: Mendoza 123, Ciudad</div>
              <div style={{color:'#666'}}>Horario: Lun a Vie 9:00 - 18:00</div>
            </div>
            <div>
              <div style={{background:'#fafafa',padding:12,borderRadius:8}}>
                <strong>Enviá tu consulta</strong>
                <form style={{marginTop:8,display:'grid',gap:8}}>
                  <input placeholder="Nombre" />
                  <input placeholder="Email" />
                  <textarea placeholder="Mensaje" />
                  <button className="btn">Enviar</button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer" style={{marginTop:18}}>© LH Automotores — Todos los derechos reservados</div>
        </footer>
      </main>
    </div>
  );
}
