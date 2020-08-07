import React,{useState,useEffect} from 'react';
import {Image, Grid} from 'semantic-ui-react'
import {IconButton, Icon , Animation, Message, Panel, Placeholder} from "rsuite";
import istek from '../../../istek';
const Urunler =props=>{
  const [beğenilmiş,setBeğenilmiş] = useState(false)
  const [yerlesim, Yerlesim] = useState('')
  const [goster, Goster] =useState(true)
  const [gorsel, Gorsel] = useState('');
  const [animasyon, Animasyon] = useState('')
  const [sepette, Sepette] = useState(Boolean)
  const [miktar, Miktar]  = useState(0)
  useEffect(()=>{

    if(props.urun?.gorsel?.data){
      Gorsel(props.urun.gorsel.data)
    }
    var sepetsırası = props.sepet.findIndex(p=>p._id===props.urun._id);

    if(sepetsırası>-1){
      Sepette(true)
      Miktar(props.sepet[sepetsırası].miktar)
    }else {
      Sepette(false)
    }
  })



  const sepetEkle=(urun)=>{
    props.sepeteEkle(urun)
    Goster(false)
  }

  const {Slide} = Animation
  return(
    <>

      <Panel className="urun_card" >
        <Grid>
          <Grid.Column width={16}>
              <Image onClick={() => props.urunAç(props.urun)} className="urun_img" src={props.urun.img} style={{width: '100%'}}
                     rounded size='small'/>
            {
              props.urun.indirimde ?  <span className="indirim">İndirimde</span> : null
            }
          </Grid.Column>
          <Grid.Column  width={16}>
            <div className="urun_card_bilgi">
              <h3 className="urun_ad">{props.urun.ad}</h3>
              <span className="urun_miktar">{props.urun.net}</span>
            </div>
            <div className="urun_meta">
              <div className="urun_meta_bilgi">
                <span className="urun_ucret">{props.urun.fiyat} ₺</span>
              </div>
              {
                props.urun.aktif ?
                  <>
                    {
                      sepette ?
                        <div className="urun_counter_katman">
                            <Icon className='urun_counter' icon='data-decrease' onClick={()=>props.miktarDeğiştir(-1,props.urun)} />
                          <span>{miktar}</span>
                            <Icon className='urun_counter' icon='plus'  onClick={()=>props.miktarDeğiştir(1,props.urun)} />
                        </div>
                        :
                        <IconButton onClick={()=>sepetEkle(props.urun)} icon={<Icon className="urun_buton" icon="shopping-basket" />} circle />

                    }
                  </>
                  :

                  <Message
                    showIcon
                    type="warning"
                    description="Tükendi"
                    className="stok_uyarı"
                  />
              }
             </div>
          </Grid.Column>
        </Grid>
      </Panel>

      </>
  )
}
export default Urunler;
