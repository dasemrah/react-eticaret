import React, {useState, useEffect} from "react";
import {Icon} from "rsuite";
import {Image} from "semantic-ui-react";
import SepetGorsel from "./SepetGorsel";
const Sepet = props=>{
  console.log('sepet props',props.sepet)
  const [ucret, Ucret] = useState(0);

  useEffect(()=>{
    var toplam=0
    props.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
    Ucret(toplam)
  })

  return(
    <>
      {
        props.sepet.map(e=>(
          <div key={e._id} className='sepet_eleman'>
            <div className="counter">
              <Icon className='sepet_count' icon='data-decrease' onClick={()=>props.miktarDeğiştir(-1,e)} />
              <span>{e.miktar}</span>
              <Icon className='sepet_count' icon='plus'  onClick={()=>props.miktarDeğiştir(1,e)} />
            </div>
            <Image onClick={()=>props.urunAç(e)} size='mini' src={e.gorsel?.data} className="sepet_gorsel" alt=""/>
            <div className="sepet_detay">
                          <span className="sepet_urun_ad">
                            {e.ad}
                          </span>
              <span className="sepet_urun_fiyat">
                            {e.fiyat} ₺
                          </span>
              <span className="sepet_urun_adet">
                            {e.miktar} X {e.net}
                          </span>
            </div>
            <span className="sepet_urun_ucret">
                            {e.ucret}₺
                          </span>
            <span className="sepet_urun_remove">
                          <Icon onClick={()=>props.urunÇıkart(e)} icon='close'/>
                        </span>
          </div>
        ))
      }
      {
        props.sepet.length> 0 ?
          <div className="tamamla">
            <button onClick={()=> props.history.push('/siparis')} className="tamamla_buton">
              <a> Siparişi Tamamla</a>
              <span className="tamamla_ucret">
                      {ucret}₺
                    </span>
            </button>
          </div>
          :null
      }
    </>
  )
}
export default Sepet
