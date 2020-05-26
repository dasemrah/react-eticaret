import React, {Component} from 'react';
import {Row,Col,Spinner} from 'reactstrap';
import {Segment, Header, List, Container} from "semantic-ui-react";
import { Table} from 'evergreen-ui'
import {Panel, Message, Steps, Input, InputGroup, Icon, Notification, IconButton, ButtonToolbar, Button, Alert} from "rsuite";
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
       const iptalEt = (ID) => {
         console.log('iptal_id', ID)
         Notification.close()
         istek
           .post('iptal',{siparisID:ID})
           .then(cvp => {
             let {status, msg} = cvp.data
             console.log(msg)

             if(status) {
               Alert.info('Sipariş silindi', 50000)
               let index = this.state.sonuc.findIndex(p => p._id === ID)
               console.log('eski sipariş bulundu')
               this.state.sonuc[index].iptal=true
               this.setState(this.state)
             }
           })
       }
       function iptalBildirim(siparis, ID) {
         let yapar = (siparis.durum <=1 && siparis.odeme==='kapıda') || (siparis.durum ===0 && siparis.odeme === 'havale')
         Notification['warning']({
           duration:5000,
           title: 'Sipariş iptali',
           description: (
               <div>
                 <p>{yapar? 'Siparişinizi iptal etmek istediğinizden emin misiniz?': 'Siparişiniz hazırlanmakta veya ücreti ödemiş durumdasınız. Bu aşamada iptal etmek için mağaza yönetimi ile iletişime geçmeniz gerekmekte.'}</p>
                 <ButtonToolbar style={{marginTop:'20px'}}>
                   {
                     yapar ?
                       <Button onClick={() =>iptalEt(ID)}>Onayla</Button>
                       :null
                   }
                 </ButtonToolbar>
               </div>
             )
         });
       }
      const gorselVer=(gorsel) => {
         istek
           .post('gorselver',{gorselID:gorsel})
           .then(cvp => {
             let img = cvp.data.img.data
             console.log('cvp alındı',img)
             return img
           })
       }
       const Ucretlendirme= ()=>(
         <Panel>
          <Panel header='Kargo bilgisi'>
            <Message
              description={'Anlaşmalı kargomuz Yurtiçi Kargo’dur. Kargo ücreti alıcıya aittir ve kapıda, kargo tesim alındıktan sonra ödenmektedir.'}
            />
            <List>
              <List.Item>1-5 kg arası 13.60 ₺</List.Item>
              <List.Item>5-10 kg arası 19.87 ₺</List.Item>
              <List.Item>10-15 kg arası 27 ₺</List.Item>
              <List.Item>15-20 kg arası 29.30 ₺</List.Item>
            </List>
          </Panel>
           <Panel header='Mağaza heapları'>
             <List>
               <List.Item>
                 <Panel header='Ziraat Bankası'>
                   <span> Şube: PAZARKÖY-NAZİLLİ/AYDIN ŞUBESİ</span><br/>
                   <span>   Hesap Numarası: 2311-45204995-5004</span><br/>
                   <span> IBAN: TR 4900 0100 2311 4520 4995 5004</span><br/>
                   <span> SEVGÜL BATUR</span>
                 </Panel>
               </List.Item>
               <List.Item>
                 <Panel header='Garanti Bankası'>
                   <span> IBAN:TR14 0006 2000 4820 0006 6618 62</span><br/>
                   <span>Sevgül Batur</span>
                 </Panel>
               </List.Item>
               <List.Item>
                 <Panel header='İş Bankası'>
                   <span> IBAN:TR380006400000130211158527</span><br/>
                   <span>Sevgül Batur</span>
                 </Panel>
               </List.Item>
             </List>
           </Panel>
         </Panel>
       )

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
             <span>siparişiniz yeni alınmış durumda. Sipariş ücretini yatırdığınızda ürünleri hazırlamaya başlıyoruz.</span>
             : e.durum ===1 ?
               <span>{e.odeme === 'kapıda' ? <>siparişiniz kapıda ödeme seçeneği ile kaydedilmiştir.</> : <>Ödemeniz alınmıştır.</>}</span>
               :e.durum === 2 ?
                 <span>siparişiniz hazırlanıyor.</span>
                 :e.durum === 3 ?
                   <span>siparişiniz hazırlandı.</span>
                   : e.durum === 4 ?
                     <span>siparişiniz hazırlandı. Önümüzdeki kargo günü kargoya verilecektir.</span>
                     :e.durum===5 ?
                       <span>siparişiz kargoya verilmiştir. </span>
                       :e.durum===6 ?
                         <span>siparişiniz teslim edilmiştir.</span>
                         :null
           }
         </>
       )

       const siparisView =this.state.sonuc.map((sip)=>
         <Row key={sip._id}>
           <>
             {sip.iptal ?
              <Panel style={{width:'80%', marginLeft:'10%'}}>
                <Message
                  description='Bu sipariş iptal edildi'
                  type={'warning'}
                />
              </Panel>
               :
               <>
                 <Col xs='12' lg='3' md='3'>
                   <Adımlar siparis={sip} durum={sip.durum}/>
                 </Col>
                 <Col md="9" lg="9" xs="12">
                   <Panel style={{backgroundColor: 'white'}}
                          header={<>{sip.tarih.substring(0, 10)} tarihli {seviyeVer(sip)}</>}>
                     <Row>
                       <Col xs="12" lg="6" md="6">
                         <br/>
                         <Panel header='Bilgilerim'>
                           <List>
                             <List.Item><Icon icon="user"/> {sip.ad}</List.Item>
                             <List.Item><Icon icon='location-arrow'/> {sip.adres} </List.Item>
                             <List.Item><Icon icon='phone'/> {sip.telefon} </List.Item>
                             <List.Item><Icon icon='clock-o' spin/> {sip.tarih.substring(0, 10)}  </List.Item>
                             {sip.detay ? <List.Item><Icon icon='tag'/> {sip.detay} </List.Item> : null}
                             <List.Item>
                               <Icon
                                 icon='money'/> {parseInt(sip.ucret) + (sip.paket ? 0 : 15) + (sip.odeme === 'kapıda' ? 10 : 0)} ₺
                             </List.Item>
                           </List>
                         </Panel>
                       </Col>
                       <Col xs="12">

                         <Panel header='Ürünlerim'>
                           <Table>
                             <Table.Head>
                               <Table.TextHeaderCell>Ürün</Table.TextHeaderCell>
                               <Table.TextHeaderCell>Miktar</Table.TextHeaderCell>
                               <Table.TextHeaderCell>Fiyat</Table.TextHeaderCell>
                             </Table.Head>
                             <Table.Body>
                               {sip.Urunler.map(urun => (
                                 <Table.Row height='auto' key={urun._id} isSelectable>
                                   <Table.TextCell>{urun.ad}</Table.TextCell>
                                   <Table.TextCell isNumber>{urun.miktar}</Table.TextCell>
                                   <Table.TextCell>{urun.fiyat} ₺</Table.TextCell>
                                 </Table.Row>
                               ))}
                             </Table.Body>
                           </Table>
                         </Panel>
                       </Col>
                       <Col xs='12'>
                         {
                           sip.odeme === 'havale' ?
                             <Ucretlendirme/>
                             : null
                         }
                       </Col>
                       <Col xs='12'>
                         <Panel>
                           <IconButton onClick={() => iptalBildirim(sip, sip._id)} icon={<Icon icon="close"/>}
                                       placement="right">
                             İptal et
                           </IconButton>
                         </Panel>
                       </Col>
                     </Row>
                   </Panel>
                   <br/>
                 </Col>
               </>
             }
             </>
           </Row>
       )
       return(
         <Container>
              <Row>
                {
                  this.state.olay === 0 ?
                      <Col xs='12' lg='6' md='6'>
                        <Panel style={{backgroundColor:'white'}} header='Sipariş Sorgula' shaded>
                          <p>Siparişinizi sorgulamak için aşağıdaki kutucuğa telefon numaranızı girdikten sonra arama butonuna dokunun.</p>
                            <br/>
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
                      <>

                        { siparisView }
                      </>
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
