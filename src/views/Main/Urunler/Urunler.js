import React from 'react';
import {Alert,Col } from 'reactstrap';
import { Card, Image,Grid,List ,Button} from 'semantic-ui-react'
const Urunler =props=>{
  return(
    <Col>
      <div className="urun_card text-center" >
        <div onClick={()=>props.urunAç(props.urun)}>
          <img className="urun_gorsel" src={props.urun.img} />
          <List horizontal>
            <List.Item><span className="h2 text-dark  "> {props.urun.fiyat} ₺</span></List.Item>
            <List.Item><span className="h5 text-dark"> {props.urun.net}</span></List.Item>
          </List>
         <List>
           <List.Item>
             <span className="text-dark text-uppercase h5">{props.urun.ad}</span>
           </List.Item>
         </List>

        </div>
        {
          props.aktif ===false ?
            <>
              <Alert color="danger">Bu ürün stokta yoktur!</Alert>
            </>
            :
            <div className="sepete_at">
              <button onClick={()=>props.sepeteEkle(props.urun)}>Sepete At</button>
            </div>


        }
      </div>

    </Col>
  )
}
export default Urunler;
