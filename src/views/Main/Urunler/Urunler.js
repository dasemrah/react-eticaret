import React,{useState,useEffect} from 'react';
import {Alert, Col, Row} from 'reactstrap';
import {Image, Icon, Button, Card, Label, Segment, Grid, List, Header} from 'semantic-ui-react'
import Disk from "o.disk/index";
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
   <div className="align-items-center text-center">
     {
       props.aktif ===false ?
         <>
           <Alert color="danger">Bu ürün stokta yoktur!</Alert>
         </>
         :
         <Button.Group className="alışveriş_butonları"  size='mini'>
           <Button size='mini' color={!beğenilmiş ? 'pink' : 'grey'} active={!beğenilmiş} onClick={()=>props.begen(props.urun)}><Icon name='heart outline'/></Button>
           <Button.Or text=' ' />
           <Button size='mini'   onClick={()=>props.sepeteEkle(props.urun)} color={!sepetteymiş ? 'green' : 'black'}>{!sepetteymiş ? <span>Sepete Ekle</span>: <span>Sepette</span>}</Button>
         </Button.Group>
     }
    </div>

  )
  return(
    <>

      <Segment className="urun_card">
        <Grid>
          <Grid.Column width={16}> <Image className="urun_img" src={props.urun.img} style={{width:'100%',height:'155px'}} rounded size='small'/></Grid.Column>
          <Grid.Column  width={16}>
            <List onClick={()=>props.urunAç(props.urun)}>
              <List.Item><span className="text-dark h6 text-uppercase text-center floated">{props.urun.ad}</span></List.Item>
              <List.Item>
                <List horizontal>
                  <List.Item>
                    <span className="text-danger h4">{props.urun.fiyat} ₺  </span>
                  </List.Item>
                  <List.Item>
                    <span className="h4 text-uppercase">{props.urun.net} </span>
                  </List.Item>
                </List>
              </List.Item>
            </List>
            <List>
              {extra}
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
      </>
  )
}
export default Urunler;
