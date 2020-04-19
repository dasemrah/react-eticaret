import React,{useState,useEffect} from 'react';
import {Alert, Col, Row} from 'reactstrap';
import {Image, Icon, Button, Card, Label, Segment, Grid, List, Header} from 'semantic-ui-react'
import Disk from "o.disk/index";
const Urunler =props=>{
  const [beğenilmiş,setBeğenilmiş] = useState(false)
  const [sepetteymiş,setSepette]       = useState(false)
  useEffect(()=>{
    var index=props.begeni.findIndex(p=>p._id===props.urun._id);
    console.log('beğeni sırası--->',index)
    if(index>-1){
      setBeğenilmiş(true)
    }
    var sepetsırası = props.sepet.findIndex(p=>p._id===props.urun._id);
    console.log('sepet sırası--->',sepetsırası)
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
         <Button.Group  size='small'>
           <Button color={!beğenilmiş ? 'pink' : 'grey'} active={!beğenilmiş} onClick={()=>props.begen(props.urun)}><Icon name='heart outline'/></Button>
           <Button.Or text=' ' />
           <Button    onClick={()=>props.sepeteEkle(props.urun)} color={!sepetteymiş ? 'green' : 'black'}>{!sepetteymiş ? <span>Sepete Ekle</span>: <span>Sepette</span>}</Button>
         </Button.Group>
     }
    </div>

  )
  return(
    <Col xs="12">
      <Card>
       <img className="urun_gorsel" src={props.urun.img}></img>
        <Card.Content   onClick={()=>props.urunAç(props.urun)}>
          <Card.Header><span className="text-center floated h6 text-uppercase"> {props.urun.ad} </span></Card.Header>
          <Card.Meta><span className="text-dark h5 text-left floated">{props.urun.net}  </span>
            <span className="text-right floated">
              <span className="sahte_fiyat p">{props.urun.fiyat*2} ₺ </span>
            <span className="text-danger h4"> {props.urun.fiyat} ₺ </span>
            </span>
          </Card.Meta>

        </Card.Content>
        <Card.Content extra>
          {extra}
        </Card.Content>
      </Card>
    </Col>
  )
}
export default Urunler;
