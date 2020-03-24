import React, {useState,useEffect} from 'react'
import {Button,Row,Col} from 'reactstrap'
import {Alert, Icon} from 'evergreen-ui'
import {Label, Transition} from "semantic-ui-react";
const Sepet =props=>{
  const [visible,setVisible] = useState(true)
  useEffect(()=>{
    console.log('Sepet Sayfası:-_->',props)
    setVisible(props.visible)
  })
  function urunÇıkart(urun) {
    setVisible(!visible);
    props.urunÇıkart(urun)
    console.log('dsadsa')
  }
  function devam() {
    props.seçkeAçKapa()
    props.history.push('/siparis')
  }
  const ÜrünleriGöster =()=>{

      return(
        <>

          <Row className="sepet_iç_katman">
            <Col xs="12">
              <Label circular color="danger" onClick={props.seçkeAçKapa} className="">
                <Icon icon="cross" color="danger" />
              </Label>

              <h3 className="text-center text-uppercase text-muted h3"> Sepetim    <img src="https://img.icons8.com/bubbles/100/000000/buy.png"/></h3>

            </Col>
             <Col xs="12">
               <Row>
                 {
                   props.sepet.map(urun=>
                     <div key={urun._id}>
                   <Transition visible={visible} animation='vertical flip' duration={100}>
                     <Col xs="12 sepet_eleman">
                       <Row>
                         <Col xs="4">
                           <img className="sepet_urun_gorsel" src={urun.img} alt=""/></Col>
                         <Col xs="4">
                           <h4 className="h4 text-uppercase text-muted text-left">{urun.ad}</h4>
                           <h4 className="h5 text-dark text-center">Ürün adedi: {urun.miktar}</h4>
                         </Col>
                         <Col xs="4">
                           <Row>
                             <Col xs="12">
                               <div className="align-content-lg-end text-center">
                                 <i className="icon-close h4" onClick={()=>urunÇıkart(urun)}> </i>
                               </div>
                             </Col>
                             <Col xs="12">
                               <div className="align-self-xs-auto text-left text-muted h3">
                                 ₺ {urun.miktar*urun.fiyat}
                               </div>
                             </Col>
                             <Col xs="12">
                                 <div color="dark urun_miktar_seçke">
                                   <i onClick={()=>props.miktarDeğiştir(-1,props.sepet.indexOf(urun),urun)} className="icon-minus h3 text-left"> </i>
                                   <i onClick={()=>props.miktarDeğiştir(1,props.sepet.indexOf(urun))} className="icon-plus h3 text-right"> </i>
                                 </div>
                             </Col>
                           </Row>
                         </Col>
                       </Row>
                     </Col>
                       </Transition>
                     </div>
                     )
                 }
               </Row>
             </Col>
            <Col xs="12">

            </Col>
            {props.sepet.length>0 ?
              <Col xs="12">
                <div className="sepet_alt_kısım align-items-center text-center">
                  <h3 color="warning"> <span className="h4 text-uppercase text-muted"> Toplam {props.toplam} Ürün</span></h3>
                  <Button onClick={()=>devam()} className="btn-warning btn align-items-center">Siparişi Tamamla</Button>
                </div>
              </Col>
            :
              <Alert
                intent="warning"
                title="Sepetiniz boş"
                marginBottom={32}
                style={{width:'100%'}}
              />
            }
          </Row>
         </>
      )
  }
  return(
    <div className="sepet-dış-katman">
      <ÜrünleriGöster/>
    </div>
  )
}
export default Sepet;
