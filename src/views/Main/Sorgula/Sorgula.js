import React, {Component} from 'react';
import {Row,Col,Spinner} from 'reactstrap';
import {Segment, Header, List, Container, Label} from "semantic-ui-react";
import {
  Panel,
  Message,
  Steps,
  Input,
  InputGroup,
  Icon,
  Notification,
  Table,
  ButtonToolbar,
  Button,
  Alert,
  Divider
} from "rsuite";
import istek from '../../../istek'
import '../../../style.css'
import Disk from "o.disk/index";
class Sorgula extends Component{
     constructor(props){
       super(props)
       this.state={
         numara:'',
         siparisler:[],
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
    componentDidMount() {
      console.log('sorgula phone',Disk?.musteri.telefon)
      if(Disk?.musteri?.telefon) {
        this.sorgula(Disk?.musteri?.telefon)
      }else {
        this.setState({
          olay:2
        })
      }
    }
     sorgula(numara){
       this.setState({
         olay:1
       })
       istek.get('/sorgula/'+numara).then(res=>{
         console.log('bulunan siparişler--->',res.data)
         let {siparis, msg, status} = res.data
         if(status) {
           siparis.map(e=>{
             if(e.odeme === 'kapıda' && e.durum === 0) {
               e.durum=1
             }
           })
           this.setState({
             siparisler:siparis,
             olay:3
           })
         }else {
           this.setState({
             olay:4
           })
         }

        console.log('state de',this.state.sonuc)
       })
     }


     render() {
       const { Column, HeaderCell, Cell, Pagination } = Table;
       const {siparisler} = this.state
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
         <>
           <List>
             <List.Header>EFT ve Havalede</List.Header>
             <List.Item> 15₺</List.Item>
           </List>
           <List>
             <List.Header>Kapıda Ödemede</List.Header>
             <List.Item>Kargo ücreti dahil 25₺</List.Item>
           </List>

         </>
       )
       const BankaHesapları =()=>(
         <>
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
         </>
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
             <span>Yeni alındı</span>
             : e.durum ===1 ?
               <span>{e.odeme === 'kapıda' ? <>Kapıda ödeme seçildi</> : <>Ödemeniz alınmıştır.</>}</span>
               :e.durum === 2 ?
                 <span>Hazırlanıyor</span>
                 :e.durum === 3 ?
                   <span> Hazırlandı.</span>
                   : e.durum === 4 ?
                     <span>Kargo için beklemede</span>
                     :e.durum===5 ?
                       <span>Kargoya verildi</span>
                       :e.durum===6 ?
                         <span>Teslim edildi</span>
                         :null
           }
         </>
       )

       const SiparisView =()=>
         <>
           {siparisler.map(e =>
             <Col xs={12}>
               <Panel
                 className="sonuclar"
                 key={e._id}
                 collapsible
                 header={
                   <div className='header'>
                     <span className="num">Sipariş <span>#{1+siparisler.findIndex(p => p._id === e._id)}</span></span>
                     <span className="durum">{seviyeVer(e)}</span>
                   </div>} >
                 <div className='detay_tepe'>
                   <div>Sipariş Tarihi:<span>{e?.tarih?.substring(0,10)}</span></div>
                   <div>Ad soyad: <span>{e.ad}</span></div>
                   <div>Telefon: <span>{e.telefon}</span></div>
                   <div>Toplam Ücret: <span>{parseInt(e.ucret)+(e.odeme==='havale' ? 15 : 25) }₺</span></div>
                 </div>
                 <div className="detay_orta">
                   <div className="adres">
                     <h3>Teslimat Adresi</h3>
                     <span>{e.adres}</span>
                   </div>
                   <div className="cost">
                     <div className="eleman">Ara Toplam  <div>{e.ucret}₺</div></div>
                     {
                       e.odeme === 'kapıda' ?
                         <div className="eleman">Kapıda Ödeme Ücreti (Kargo ücreti dahil) <div>+25₺</div></div>
                         :
                         <div className="eleman">Kargo Ücreti (Yurtiçi Kargo)  <div> +15₺ </div></div>
                     }

                     <div className="eleman">
                       Ödeme Türü
                       <div>
                         {
                           e.odeme === 'havale' ?
                             <Label size='mini' color='teal'>Havale</Label>
                             :e.odeme === 'kapıda' ?
                             <Label size='mini'>Kapıda {e.kapida === 'nakit' ?
                               <Label size='mini' color='green'>nakit</Label> : <Label color='yellow' size='mini'>kartla</Label>}
                             </Label>
                             :null
                         }
                       </div>
                     </div>
                     <div style={{color:' rgb(13, 17, 54)'}} className="eleman">Toplam  <div>{parseInt(e.ucret)+(e.odeme==='havale' ? 15 : 25)} ₺</div></div>
                   </div>
                   <div className="step">
                     <Adımlar siparis={e} durum={e.durum}/>
                   </div>
                   {
                     e.odeme === 'havale' ?
                       <Panel header='Banka Hesapları' collapsible>
                         <BankaHesapları/>
                       </Panel>
                       :null
                   }
                   <br/>
                   <Panel header='Kargo ücretlendirmesi' collapsible className="ucretlendirme">
                     <Ucretlendirme/>
                   </Panel>
                   <Divider/>
                   <div>
                     <Table

                       autoHeight
                       rowHeight={60}
                       data={e.Urunler}
                       onRowClick={data => {
                         console.log(data);
                       }}
                     >

                       <Column flexGrow={2} align="center">
                         <HeaderCell>Ürün</HeaderCell>
                         <Cell dataKey="ad" />
                       </Column>

                       <Column flexGrow={1}>
                         <HeaderCell>Adet</HeaderCell>
                         <Cell dataKey="miktar" />
                       </Column>
                       <Column flexGrow={1}>
                         <HeaderCell>Ürün boyutu</HeaderCell>
                         <Cell dataKey="net" />
                       </Column>
                       <Column flexGrow={1}>
                         <HeaderCell>Fiyat</HeaderCell>
                         <Cell>
                           {rowData => (
                             <span>{rowData.fiyat}₺</span>
                           )}
                         </Cell>
                       </Column>
                     </Table>
                   </div>
                 </div>
               </Panel>
             </Col>
           )
           }
         </>

       return(
         <div className="sonuclar_page">
              <Row>
                {
                  this.state.olay === 2 ?
                      <Col xs='12'>
                        <Panel className="siparis_hata" style={{backgroundColor:'white'}} header='Sipariş Sorgula' shaded>
                          <p>Siparişinizi sorgulamak için aşağıdaki kutucuğa telefon numaranızı girdikten sonra arama butonuna dokunun.</p>
                            <br/>
                          <InputGroup inside>
                            <InputGroup.Addon>+90 </InputGroup.Addon>
                            <Input onChange={this.onChange} type='number' placeholder='  telefon numarası' />
                            <InputGroup.Button onClick={()=>this.sorgula(this.state.numara)}><Icon icon="search" /></InputGroup.Button>
                          </InputGroup>
                        </Panel>
                      </Col>
                    :null
                }

                <Col xs="12" md="12" lg="12">
                  {this.state.olay === 3 ?
                      <div className="sonuclar_katman">
                        <Row>
                          <SiparisView/>
                        </Row>
                      </div>
                  : this.state.olay ===4 ?
                    <Panel className="siparis_hata">
                      <Message
                        showIcon
                        type='warning'
                        title='Hiç sipariş vermemişsiniz'
                        description='Bir hata olduğunu düşünüyorsanız mağazamızla iletişime geçiniz.'
                      />
                      <Button color='blue' onClick={() => this.setState({olay:2})}>
                        Farklı bir numara ile sorgula
                      </Button>
                    </Panel>
                      :null
                  }
                </Col>

              </Row>

         </div>
       )
     }
}
export default Sorgula;
