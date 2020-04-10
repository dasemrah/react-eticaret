import React, {Component} from 'react';
import {Input,Row,Col,Spinner} from 'reactstrap';
import {Segment, Header, Container, List, Icon} from "semantic-ui-react";
import {Alert, Button, Table} from 'evergreen-ui'
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
               <span>Ödemeniz alınmıştır.</span>
               :e.durum === 2 ?
                 <span>Siparişiniz hazırlanıyor.</span>
                 :e.durum === 3 ?
                   <span>Siparişiniz hazırlandı.</span>
                   : e.durum === 4 ?
                     <span>Siparişiniz hazırlandı. Önümüzdeki kargo günü kargoya verilecektir.</span>
                     :e.durum===5 ?
                       <span>Siparişiz kargoya verilmiştir. </span>
                       :e.durum===6 ?
                         <span>Siparişiniz teslim edilmiştir.</span>
                         :null
           }
         </>
       )
       const siparisView =this.state.sonuc.map((sip)=>
         <Col md="12" lg="12" xs="12">
           <br/>
           <Segment>
              <Row>
                <Col xs="12">
                  <Header as='h3' textAlign='center'>
                    {sip.tarih.substring(0,10)} tarihli siparişiniz
                  </Header>
                  <br/>
                  <Alert
                    intent="success"
                    title={seviyeVer(sip)}
                  />
                  <br/>
                </Col>
                <Col xs="12" lg="6" md="6">
                  <br/>
                  <Segment color="purple">
                    <Header as='h4' textAlign='center' dividing>
                      Bilgileriniz
                    </Header>
                    <List>
                      <List.Item><Icon name="user"/> {sip.ad}</List.Item>
                      <List.Item><Icon name='location arrow'/> {sip.adres} </List.Item>
                      <List.Item><Icon name='phone'/> {sip.telefon} </List.Item>
                      <List.Item><Icon name='clock outline'/> {sip.tarih.substring(0,10)}  </List.Item>
                      <List.Item><Icon name='tag'/> {sip.detay} </List.Item>
                    </List>
                  </Segment>
                </Col>
                <Col xs="12" md="6" lg="6">
                  <br/>
                  <Segment color="orange">
                    <Header as='h4' textAlign='center' dividing>
                      Ürünler
                    </Header>
                    <Table>
                      <Table.Head>
                        <Table.TextHeaderCell>
                          Ürün
                        </Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                          Miktar
                        </Table.TextHeaderCell>
                      </Table.Head>
                      <Table.Body>
                        {sip.Urunler.map(urun => (
                          <Table.Row height='auto' key={urun._id} isSelectable>
                            <Table.TextCell>{urun.ad}</Table.TextCell>
                            <Table.TextCell isNumber>{urun.miktar}</Table.TextCell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Segment>
                </Col>
              </Row>
           </Segment>
           <br/>
         </Col>
       )
       return(
         <Container>
           <Row>
             {
               this.state.olay===1 ?
                 <Col xs="12" className="align-items-center align-content-center"> <Spinner color="success"/></Col>
                 : this.state.olay===2 ?
                 this.state.sonuc.length >0 ?
                   <Alert intent="success" title={'Toplam '+ this.state.sonuc.length+' siparişiniz bulundu...'} marginBottom={32}/>
                   : <Alert intent="warning" title="Hiç sipariş vermemişsiniz..." marginBottom={32}/>
                 :
                 <Col xs="12" md="12" lg="12">
                   <Segment>
                     <Header as='h3' textAlign='center'>
                       Telefon numarası ile sipariş sorgula
                     </Header>
                     {
                       this.state.olay === 0 ?
                         <Alert
                           intent="none"
                           title='Aşağıdaki kutucuğa telefon numaranızı yazıp "Sorgula" butonuna basınız.'
                           marginBottom={32}
                         />
                         :null
                     }


                     <Input type="text" value={this.state.numara} placeholder="telefon numaranızı girin" onChange={this.onChange}/>
                     <br/>
                     {
                       this.state.numara.length >=10 ?
                         <Button height={24} onClick={this.sorgula} iconAfter="search" intent='warning'>
                           Sorgula
                         </Button>
                         :null
                     }
                   </Segment>

                 </Col>

             }
             <Col xs="12" md="12" lg="12">

               <Row>

                 { siparisView }
               </Row>
             </Col>

           </Row>
         </Container>
       )
     }
}
export default Sorgula;
