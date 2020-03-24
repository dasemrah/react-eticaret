import React, {Component} from 'react';
import {Input,Row,Col,Spinner,Button,Alert,Jumbotron,} from 'reactstrap';
import istek from '../../../istek'
import '../../../style.css'
class Sorgula extends Component{
     constructor(props){
       super(props)
       this.state={
         numara:'',
         sonuc:[],
         olay:0
       }
       this.onChange=this.onChange.bind(this);
       this.sorgula=this.sorgula.bind(this);
     }
     onChange(e){
       this.setState({
         numara:e.target.value,

       })
     }
     sorgula(){
       this.setState({
         olay:1
       })
       istek.get('/sorgula/'+this.state.numara).then(res=>{
         console.log(res.data)
         this.setState({
           sonuc:res.data,
           olay:2
         })

       })
     }
     render() {
       const seviyeVer =(e)=>(
         <>
           {e.durum === 0 ?
           <span>Siparişiniz yeni alınmış durumda. Sipariş ücretini yatırdığınızda ürünleri hazırlamaya başlıyoruz.</span>
             : e.durum ===1 ?
               <span>Ödemenizi aldık. Ürünü hazırlayıp önümüzdeki kargo gününde adresinize göndereceğiz.
                 Ürününüzü kargoya verdiğimizde size haber verip kargo takip numarasını da sizinle paylaşacağız.</span>
               :e.durum === 2 ?
                 <span>Siparişinizi hazırladık. Önümüzdeki kargo gününde kargo ile adresinize göndereceğiz.</span>
                 :e.durum === 3 ?
                   <span>Siparişinizi kargoya verdik. Size gönderdiğimiz kargo takip numarasından kargonuzu takip edebilirsiniz.</span>
                  : e.durum === 4 ?
                     <span>Bu ürünü teslim almışsınız. Eğer kargo ile ilgili bir sorun yaşadıysanız lütfen bizimle irtibata geçiniz.</span>
                     :<span>Önceden vermiş olduğunuz bir sipariş.</span>
           }
         </>
       )
       const siparisView =this.state.sonuc.map((sip)=>
         <Col md="12" lg="12" xs="12">
           <Jumbotron className="danger">
              <Row>
                <Col xs="12">
                  <h4 className="text-center text-dark">Sipariş Durumu</h4>
                  <Alert color="warning"><h3 className="text-dark">{seviyeVer(sip)}</h3></Alert>
                </Col>
                <Col xs="12" lg="6" md="6">
                  <br/>
                  <h4 className="text-center text-dark">Bilgileriniz</h4>
                  <h3><i className="icon-user">  {sip.ad} </i> </h3>
                  <h4><i className="icon-location-pin">  {sip.adres} </i></h4>

                  <h4> <i className="icon-phone">            {sip.telefon} </i> </h4>
                  <h4><i className="icon-clock">             {sip.tarih.slice(0,10)}   </i> </h4>
                  <h4> <i className="icon-social-instagram"> {sip.userid}  </i> </h4>
                  <h4><i className="icon-pencil">            {sip.detay}   </i> </h4>
                </Col>
                <Col xs="12" md="6" lg="6">
                  <br/>
                  <h4 className="text-center text-dark">Ürünler</h4>
                  <Row>
                    {
                      sip.Urunler.map(elemet=>
                        <Col lg="12" md="12" xs="12">
                          <div key={elemet._id}>
                            <Row>
                              <Col>
                                <p> {elemet.urun.ad}</p>
                              </Col>
                              <Col>
                                <p className="text-center">   {elemet.kg}KG</p>
                              </Col>
                            </Row>


                          </div>
                        </Col>
                      )
                    }
                  </Row>
                </Col>

              </Row>
           </Jumbotron>
         </Col>
       )
       return(

         <Row>
           {
             this.state.olay===1 ?
               <Col xs="12" className="align-items-center align-content-center"> <Spinner color="success"/></Col>

               : this.state.olay===2 ?
                   <></>
                   :
                   <Col xs="12" md="12" lg="12">
                     <Jumbotron>
                       <h3>Telefon numarası ile sipariş sorgula</h3>
                       {
                         this.state.olay === 0 ?
                           <Alert color="info">Aşağıdaki kutucuğa telefon numaranızı yazıp "Sorgula" butonuna basınız.</Alert>
                           :
                           <></>
                       }


                       <Input type="text" value={this.state.numara} placeholder="telefon numaranızı girin" onChange={this.onChange}/>
                       <br/>
                       {
                         this.state.numara.length >=10 ?
                           <Button onClick={this.sorgula} className="btn-success" >
                             {
                               this.state.olay===0 ?
                                 <h4 className="text-light">Sorgula</h4>
                                 :<></>
                             }
                           </Button>
                           :<></>
                       }
                     </Jumbotron>

                   </Col>

               }
             <Col xs="12" md="12" lg="12">
             {
               this.state.olay === 2 ?
                 this.state.sonuc.length >0 ?
                   <>
                     <Alert color="success"><span className="display-4 text-dark">Toplam {this.state.sonuc.length} siparişiniz bulundu!</span></Alert>
                   </>
                   :
                   <>
                     <Alert className="danger"><h3>Hiç sipariş vermemişsiniz!</h3></Alert>
                   </>
                 :
                 <>
                 </>
             }
             <Row>

             { siparisView }
             </Row>
             </Col>

         </Row>
       )
     }
}
export default Sorgula;
