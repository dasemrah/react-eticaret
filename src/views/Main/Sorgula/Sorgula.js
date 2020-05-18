import React, {Component} from 'react';
import {Row,Col,Spinner} from 'reactstrap';
import {Segment, Header, List, Container} from "semantic-ui-react";
import {Alert, Button, Table} from 'evergreen-ui'
import {Panel, Message, Steps, Input, InputGroup, Icon} from "rsuite";
import istek from '../../../istek'
import '../../../style.css'
class Sorgula extends Component{
     constructor(props){
       super(props)
       this.state={
         numara:'',
         sonuc:[],
         olay:0,
         adım:0,
         pictures:''
       }
       this.onChange=this.onChange.bind(this);
       this.sorgula=this.sorgula.bind(this);
     }
     onChange(e){
       console.log(e)
       this.setState({
         numara:e
       })
     }
     sorgula(){
       this.setState({
         olay:1
       })
       istek.get('/sorgula/'+this.state.numara).then(res=>{
         console.log(res.data)
        res.data.map(e=>{
          if(e.odeme === 'kapıda' && e.durum === 0) {
            e.durum=1
          }
        })

         this.setState({
           sonuc:res.data,
           olay:2,
           adım:res.data.durum
         })
        console.log('state de',this.state.sonuc)
       })
     }

     render() {
       const Adımlar = (e)=>(
         <Steps vertical current={e.durum}>
           <Steps.Item  title={'Siparişiniz alındı'} />
           {
             e.siparis.odeme === 'havale' ?
               <Steps.Item  title={'Ödemeniz alınmıştır'} />
               : <Steps.Item  title={'Kapıda Ödeme Seçildi'} />
           }
           <Steps.Item  title={'Hazırlanıyor'} />
           <Steps.Item  title={'Hazırlandı'} />
           <Steps.Item  title={'Kargo için beklemede'} />
           <Steps.Item  title={'Kargoda'} />
           <Steps.Item  title={'Teslim edildi'} />
         </Steps>
       )
       const seviyeVer =(e)=>(
         <>
           {e.durum === 0 ?
             <span>Siparişiniz yeni alınmış durumda. Sipariş ücretini yatırdığınızda ürünleri hazırlamaya başlıyoruz.</span>
             : e.durum ===1 ?
               <span>{e.odeme === 'kapıda' ? <>Siparişiniz kapıda ödeme seçeneği ile kaydedilmiştir.</> : <>Ödemeniz alınmıştır.</>}</span>
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
         <>
           <Col xs='12' lg='3' md='3'>
             <Adımlar siparis={sip} durum={sip.durum}/>
           </Col>
         <Col md="9" lg="9" xs="12">
           <Panel style={{backgroundColor:'white'}} shaded>
              <Row>
                <Col xs="12">

                  <Message
                    showIcon
                    type="success"
                    title={sip.tarih.substring(0,10)+' tarihli siparişiniz'}
                    description={seviyeVer(sip)}
                  />
                  <br/>
                </Col>
                <Col xs="12" lg="6" md="6">
                  <br/>
                  <Panel header='Bilgilerim'>
                    <List>
                      <List.Item><Icon icon="user"/> {sip.ad}</List.Item>
                      <List.Item><Icon icon='location-arrow'/> {sip.adres} </List.Item>
                      <List.Item><Icon icon='phone'/> {sip.telefon} </List.Item>
                      <List.Item><Icon icon='clock-o' spin/> {sip.tarih.substring(0,10)}  </List.Item>
                      {sip.detay ?  <List.Item><Icon icon='tag'/> {sip.detay} </List.Item> : null}
                      <List.Item>
                        <Icon icon='money'/> {parseInt(sip.ucret)+(sip.paket ? 0 : 15)+(sip.odeme==='kapıda' ? 10 : 0)} ₺
                      </List.Item>
                    </List>
                  </Panel>
                </Col>
                <Col xs="12" md="6" lg="6">

                  <Panel header='Ürünlerim'>
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
                  </Panel>
                </Col>
              </Row>
           </Panel>
           <br/>
         </Col>
           </>
       )
       return(
         <Container>
              <Row>
                {
                  this.state.olay === 0 ?
                      <Col xs='12' lg='6' md='6'>
                        <Panel style={{backgroundColor:'white'}} header='Sipariş Sorgula' shaded>
                          <InputGroup inside>
                            <InputGroup.Addon>+90 </InputGroup.Addon>
                            <Input onChange={this.onChange} type='number' placeholder='  telefon numarası' />
                            <InputGroup.Button onClick={()=>this.sorgula()}><Icon icon="search" /></InputGroup.Button>
                          </InputGroup>
                        </Panel>
                      </Col>
                    :null
                }

                <Col xs="12" md="12" lg="12">
                  {this.state.olay === 2 ?
                    this.state.sonuc.length>0 ?
                      <Row>

                        { siparisView }
                      </Row>
                      :
                      <Message
                        showIcon
                        type='warning'
                        title='Hiç sipariş vermemişsiniz'
                        description='Bir hata olduğunu düşünüyorsanız mağazamızla iletişime geçiniz.'
                      />
                  :null}
                </Col>

              </Row>

         </Container>
       )
     }
}
export default Sorgula;
