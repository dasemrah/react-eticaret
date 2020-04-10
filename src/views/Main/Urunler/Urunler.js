import React from 'react';
import {Alert,Col } from 'reactstrap';
import {Button} from 'evergreen-ui'
import {Image ,Icon,Card} from 'semantic-ui-react'
const Urunler =props=>{
  const extra = (
   <>
     {
       props.aktif ===false ?
         <>
           <Alert color="danger">Bu ürün stokta yoktur!</Alert>
         </>
         :
         <Button height={24} intent={'danger'} iconAfter="shopping-cart" onClick={()=>props.sepeteEkle(props.urun)}>
           Sepete At
         </Button>



     }
    </>

  )
  return(
    <Col xs="12">
      <Card>
        <Image src={props.urun.img} wrapped ui={false} />
        <Card.Content   onClick={()=>props.urunAç(props.urun)}>
          <Card.Header>{props.urun.ad}</Card.Header>
          <Card.Meta>{props.urun.net}   {props.urun.fiyat} ₺</Card.Meta>

        </Card.Content>
        <Card.Content extra>
          {extra}
        </Card.Content>
      </Card>
    </Col>
  )
}
export default Urunler;
