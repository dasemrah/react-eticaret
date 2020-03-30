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
                           <h4 className="h4 text-uppercase text-dark text-left">{urun.ad}</h4>
                           <h4 className="h6 text-muted text-left">{urun.net}</h4>

                         </Col>
                         <Col xs="4">
                           <Row>
                             <Col xs="12">
                               <div className="text-right">
                                 <i className="icon-close h4 text-danger" onClick={()=>urunÇıkart(urun)}> </i>
                               </div>
                             </Col>
                             <Col xs="12">
                               <div className="align-self-xs-auto text-left text-muted h3">
                                 ₺ {urun.miktar*urun.fiyat}
                               </div>
                             </Col>
                             <Col xs="12">
                                 <div className="urun_miktar_seçke">
                                   <img  onClick={()=>props.miktarDeğiştir(-1,props.sepet.indexOf(urun),urun)} src="https://img.icons8.com/android/24/000000/minus.png"/>
                                   <span className="text-dark h2 text-center floated">{urun.miktar}</span>
                                   <img onClick={()=>props.miktarDeğiştir(1,props.sepet.indexOf(urun))} src="https://img.icons8.com/android/24/000000/plus.png"/>
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
                  <h3 color="warning"> <span className="h4 text-uppercase text-muted"> Toplam {props.sepet.length} Ürün</span></h3>
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
