import React from 'react';
import {Alert,Col } from 'reactstrap';
import { Card, Image,Label,Button } from 'semantic-ui-react'

const Urunler =props=>{
  return(
    <Col>

      <Card  className="urun_card">
        <Image src={props.urun.img} wrapped ui={false} />

        <Card.Content onClick={()=>props.urunAç(props.urun)}>
          <Card.Header className="text-center">{props.urun.ad}</Card.Header>
          <Card.Meta>
            <Label.Group tag>
              <Label className="fiyat"  size='mini'  as='a'>{props.urun.fiyat} ₺</Label>
            </Label.Group>
          </Card.Meta>

        </Card.Content>
        <Card.Content extra>

          {
            props.aktif ===false ?
              <>
                <Alert color="danger">Bu ürün stokta yoktur!</Alert>
              </>
              :
              <Button color="yellow" size='mini' content='Sepete Ekle' icon='shopping bag' labelPosition='right'
                      onClick={()=>console.log(props.sepeteEkle(props.urun))}/>

          }
        </Card.Content>
      </Card>
    </Col>
  )
}
export default Urunler;
