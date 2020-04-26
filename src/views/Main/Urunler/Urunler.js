import React,{useState,useEffect} from 'react';
import {Alert,} from 'reactstrap';
import {Image, Grid} from 'semantic-ui-react'
import {Panel} from "rsuite";
import {IconButton, Icon} from "rsuite";

const Urunler =props=>{
  const [beğenilmiş,setBeğenilmiş] = useState(false)
  const [sepetteymiş,setSepette]       = useState(false)
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
  const extra = (
   <div className="card_aciklama">
     {
       props.aktif ===false ?
         <>
           <Alert color="danger">Bu ürün stokta yoktur!</Alert>
         </>
         :
          <button className="card_buton">
              <i className="icon-basket">d </i>
          </button>
     }
    </div>

  )
  return(
    <>

      <Panel className="urun_card" >
        <Grid>
          <Grid.Column width={16}> <Image className="urun_img" src={props.urun.img} style={{width:'100%',height:'155px'}} rounded size='small'/></Grid.Column>
          <Grid.Column  width={16}>
            <div className="urun_card_bilgi">
              <h3 className="urun_ad">{props.urun.ad}</h3>
              <span className="urun_miktar">{props.urun.net}</span>
            </div>
            <div className="urun_meta">
              <div className="urun_meta_bilgi">
                <span className="urun_ucret">{props.urun.fiyat} ₺</span>
              </div>
                <IconButton onClick={()=>props.sepeteEkle(props.urun)} icon={<Icon className="urun_buton" icon="shopping-basket" />} color="white" circle />
            </div>
          </Grid.Column>
        </Grid>
      </Panel>

      </>
  )
}
export default Urunler;
