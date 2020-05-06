import React,{useState,useEffect} from 'react';
import {Image, Grid} from 'semantic-ui-react'
import {Panel} from "rsuite";
import {IconButton, Icon , Animation, Message} from "rsuite";

const Urunler =props=>{
  const [beğenilmiş,setBeğenilmiş] = useState(false)
  const [sepetteymiş,setSepette]       = useState(false)
  const [yerlesim, Yerlesim] = useState('')
  const [goster, Goster] =useState(false)
  useEffect(()=>{

    var index=props.begeni.findIndex(p=>p._id===props.urun._id);
    if(index>-1){
      setBeğenilmiş(true)
    }
    var sepetsırası = props.sepet.findIndex(p=>p._id===props.urun._id);
    if(sepetsırası>-1){
      setSepette(true)
    }
  })
  const sepetEkle=(urun)=>{
    props.sepeteEkle(urun)
    Goster(true)
  }

  const {Slide} = Animation
  return(
    <>

      <Panel className="urun_card" >
        <Grid>
          <Grid.Column width={16}>
            <Image onClick={()=>props.urunAç(props.urun)} className="urun_img" src={props.urun.img} style={{width:'100%'}} rounded size='small'/>
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
                  <IconButton onClick={()=>sepetEkle(props.urun)} icon={<Icon className="urun_buton" icon="shopping-basket" />} circle />
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
