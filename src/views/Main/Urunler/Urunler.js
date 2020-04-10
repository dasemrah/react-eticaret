import React from 'react';
import {Alert,Col } from 'reactstrap';
import {Button} from 'evergreen-ui'
import {Image ,Icon,Card} from 'semantic-ui-react'
const Urunler =props=>{
  const extra = (
   <div className="align-items-center text-center">
     {
       props.aktif ===false ?
         <>
           <Alert color="danger">Bu ürün stokta yoktur!</Alert>
         </>
         :
         <Button height={26} intent={'danger'} iconAfter="shopping-cart" onClick={()=>props.sepeteEkle(props.urun)}>
           Sepete At
         </Button>



     }
    </div>

  )
  return(
    <Col xs="12">
      <Card>
        <Image src={props.urun.img} wrapped ui={false} />
        <Card.Content   onClick={()=>props.urunAç(props.urun)}>
          <Card.Header>{props.urun.ad}</Card.Header>
          <Card.Meta><span className="text-dark h5 text-left floated">{props.urun.net}  </span> <span className="text-success text-right floated">{props.urun.fiyat} ₺</span></Card.Meta>

        </Card.Content>
        <Card.Content extra>
          {extra}
        </Card.Content>
      </Card>
    </Col>
  )
}
export default Urunler;
