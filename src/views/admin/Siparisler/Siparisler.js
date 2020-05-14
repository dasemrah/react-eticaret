import React, { Component, } from 'react';
import { Print } from 'react-easy-print';
import {Table, Icon,Panel, Alert, Message, Modal, Dropdown, Button, Divider, IconButton, Loader} from "rsuite";
import {Label, List, Popup} from "semantic-ui-react";
import {Row, Col} from 'reactstrap'
import SiparisKart from "./Siparis/SiparisKart";
import api from '../../../istek'
class Siparisler extends Component {
  constructor(props){
    super(props)
    this.state={
      tumsiparisler : [],
      siparişsayısı : [],
      loading       : false,
      siparişAç     : false,
      sipariş       : [],
      aktifitem     : 0
    }
  }
  componentDidMount() {
    this.siparisleriAl()
  }
  siparisSayisiHesapla=(seviye)=>{
    if(seviye==='hepsi'){
      return (this.state.siparişsayısı.length)
    }
    var sayı = 0
    this.state.siparişsayısı.map(e=>{
      if(e.durum===seviye){
        sayı++
      }
    })
    return(sayı)
  }

  siparişSil=(s)=>{

    if(s.durum===7){
      this.setState({loading:true})
      let index=this.state.tumsiparisler.findIndex(p=>p._id===s._id)
      let index_1=this.state.siparişsayısı.findIndex(p=>p._id===s._id)
      api
        .post('siparissil',{siparisid:s._id})
        .then(ynt=>{
          if(index>=0 && ynt.data.olay === 1){
            this.state.tumsiparisler.splice(index, 1)
            this.state.siparişsayısı.splice(index_1, 1)
            this.setState(this.state)
            Alert.success('Sipariş silindi',2500)
          }
          this.setState({loading:false})
        })
    }else {
      Alert.warning('Siparişi silmek için önce sipariş durumunu pasif yapın',5000);
    }
  }
  siparisleriAl=()=>{
    this.setState({loading:true})
    api
      .get('tumsiparisler')
      .then(ynt=>{
        console.log('tüm siparişler alındı',ynt.data.siparis)
        this.setState({
          tumsiparisler:ynt.data.siparis,
          siparişsayısı:ynt.data.siparis,
          loading:false,
          aktifitem:'hepsi'
        })
      })
  }
  sırala=(seviye)=>{
    this.setState({loading:true})
  api
    .get('siparisler/'+seviye)
    .then(ynt=>{
      this.setState({
        tumsiparisler:ynt.data.orders,
        aktifitem:seviye,
        loading:false
      })
    })
}
  siparişAç=(data)=>{
    console.log('sipariş ',data)
    this.setState({
      siparişAç:true,
      sipariş:data
    })
}
  seviye=(siparisid, seviye)=>{
    this.setState({
      loading:true
    })
    api
      .post('/seviye',{siparisid,seviye})
      .then(ynt=>{
        let order=ynt.data.order

        console.log('değişen sipariş',order)
        let index= this.state.tumsiparisler.findIndex(p=>p._id===order._id)
        console.log('ürün index',index)
        order.durum=seviye
        this.state.tumsiparisler[index]=order
        this.setState({
          loading:false
        })
      })
  }

  render() {
    const {sipariş} = this.state
    const { Column, HeaderCell, Cell, Pagination } = Table;
    const ürünstili = {
      background: '#000',
      padding: 20,
      boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)'
    };
    const DurumGöster=({rowData, dataKey, ...props})=>{

          return(
            <Cell {...props}>
              {
                rowData.durum === 0 ?
                  <span><Label color='blue' circular size='mini'/> Yeni</span>
                  :rowData.durum === 1 ?
                    <span><Label color='purple' circular size='mini'/> Ödendi</span>
                   :rowData.durum === 2 ?
                    <span><Label color='yellow' circular size='mini'/> Hazırlanıyor</span>
                    :rowData.durum === 3 ?
                      <span><Label color='green' circular size='mini'/> Hazırlandı</span>
                      :rowData.durum === 4 ?
                        <span><Label color='orange' circular size='mini'/> Kargoya Verilecek</span>
                        :rowData.durum === 5 ?
                          <span> <Label color='teal' circular size='mini'/> Kargoya Verildi</span>
                          :rowData.durum === 6 ?
                          <span><Label color='pink' circular size='mini'/>  Teslim Edildi</span>
                            :rowData.durum === 7 ?
                              <span><Label color='black' circular size='mini'/> Pasif</span>
                              :null
              }
            </Cell>
          )
   }


   const ÖdemeTürü=({rowData, dataKey, ...props})=>{

     return(
       <Cell {...props}>
         {
           rowData.odeme === 'havale' ?
             <Label size='mini' color='teal'>Havale</Label>
             :rowData.odeme === 'kapıda' ?
             <Label size='mini'>Kapıda {rowData.kapida === 'nakit' ?
               <Label size='mini' color='green'>nakit</Label> : <Label color='yellow' size='mini'>kartla</Label>}
             </Label>
             :null
         }
       </Cell>
     )
   }
   const Yazdırıcı=()=>(
     <Modal full size='lg' show={this.state.siparişAç} onHide={()=>this.setState({siparişAç:false})}>
       <Modal.Header>

       </Modal.Header>
       <Modal.Body className="yazdırılan_ekran">
          <Print>
            <Panel onClick={()=>window.print()}>
              <Row>
                <Col xs='6'>
                  <List>
                    <List.Item>Ad</List.Item>
                    <List.Content floated='right'>
                      {sipariş.ad}
                    </List.Content>
                  </List>
                  <List>
                    <List.Item>Adres</List.Item>
                    <List.Content floated='right'>
                      {sipariş.adres}
                    </List.Content>
                  </List>
                </Col>
                <Col xs='6'>
                  <Table height='100%' data={sipariş.Urunler} autoHeight>
                    <Column width={50} align="center" resizable>
                      <HeaderCell>Ad</HeaderCell>
                      <Cell dataKey="ad" />
                    </Column>

                    <Column width={100} resizable>
                      <HeaderCell>Adet</HeaderCell>
                      <Cell dataKey="miktar" />
                    </Column>

                    <Column width={100} resizable>
                      <HeaderCell>Boyut</HeaderCell>
                      <Cell dataKey="net" />
                    </Column>

                    <Column width={200} resizable>
                      <HeaderCell>Fiyat</HeaderCell>
                      <Cell dataKey="fiyat" />
                    </Column>

                  </Table>
                </Col>
              </Row>
            </Panel>
          </Print>
       </Modal.Body>

     </Modal>

   )
   const Aksiyon=({rowData, dataKey, ...props})=>{
      const yazdırıcı=(
        <>
          <Message type="info" description="Bir sonraki ekrada çıktı almak için ürünlerin üzerine tıklayın.
          En iyi görüntü için 'Daha fazla ayar' bölümünden ölçeği 200 yapın" />
          <Button onClick={()=>this.siparişAç(rowData)}>Yazdır</Button>
        </>
      )
     const ürünler=(

          <Table
            height={360}
            width={400}
            data={rowData.Urunler}
            wordWrap
          >
            <Column width={200} align="center" fixed='left'>
              <HeaderCell>Ad</HeaderCell>
              <Cell dataKey="ad" />
            </Column>
            <Column width={55} align="center">
              <HeaderCell>Adet</HeaderCell>
              <Cell dataKey="miktar" />
            </Column>
            <Column width={90} align="center">
              <HeaderCell>Miktar</HeaderCell>
              <Cell dataKey="net" />
            </Column>
            <Column width={55} align="center">
              <HeaderCell>Fiyat</HeaderCell>
              <Cell dataKey="fiyat" />
            </Column>

          </Table>
     )
      const düzenle=(
        <>
          <h5 className="text-center">Siparişi Düzenle</h5>
         <Panel>
          <List>
            <List.Item>
              <List.Content floated='right'> <IconButton onClick={()=>this.siparişSil(rowData)} icon={<Icon icon="trash" />} color="red" circle /></List.Content>
              <List.Content>Sil</List.Content>
            </List.Item>
          </List>
         </Panel>
          <Divider/>
            <Dropdown style={{width:'100%'}} title='Sipariş Durumu'>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,0)}>Yeni Sipariş</Dropdown.Item>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,1)}>Ödendi</Dropdown.Item>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,2)}>Hazırlanıyor</Dropdown.Item>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,3)}>Hazırlandı</Dropdown.Item>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,4)}>Kargoya Verilecek</Dropdown.Item>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,5)}>Kargoya Verildi</Dropdown.Item>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,6)}>Teslim Edildi</Dropdown.Item>
              <Dropdown.Item onSelect={()=>this.seviye(rowData._id,7)}>Pasif</Dropdown.Item>
            </Dropdown>
        </>
      )
      return(
        <Cell {...props}>

          <span>
           <Popup
             pinned
             on='click'
              trigger={<i className="icon-basket"></i>}
              content={ürünler}
              size='large'
              position='left center'
           />
            |{' '}
            <Popup
              on='click'
              pinned
              trigger={<i className="icon-printer"></i>}
              content={yazdırıcı}
              size='big'
              position='left center'
            />|{' '}
            <Popup
              on='click'
              pinned
              trigger={<i className="icon-pencil"></i>}
              content={düzenle}
              size='big'
              position='left center'
            />
          </span>
        </Cell>
      )
   }

    const OrdersTable=()=>(
      <div>
        <Table
          autoHeight
          wordWrap
          rowHeight={60}
          loading={this.state.loading}
          height={500}
          data={this.state.tumsiparisler}
        >
          <Column width={155} resizable>
            <HeaderCell >Ad</HeaderCell>
            <Cell dataKey="ad" />
          </Column>

          <Column width={130} resizable>
            <HeaderCell>Numara</HeaderCell>
            <Cell>
              {rowData=>(
                <>
                  {rowData.telefon?
                    <>
                      { rowData.telefon.substring(2,rowData.telefon.length)}
                      <a target='_blank' href={'https://wa.me/'+rowData.telefon.substring(1,rowData.telefon.length)}> <Icon style={{color:'rgb(0, 158, 127)'}}  size='lg' icon='whatsapp'/></a>
                    </>
                  : null}
                  </>
              )}
            </Cell>
          </Column>

          <Column width={300} resizable>
            <HeaderCell>Adres</HeaderCell>
            <Cell dataKey="adres"/>
          </Column>
          <Column width={120} resizable>
            <HeaderCell>Not</HeaderCell>
            <Cell dataKey="detay"/>
          </Column>
          <Column width={75} resizable>
            <HeaderCell>Ücret</HeaderCell>
           <Cell>
             {rowData=>(
               <>
                 {parseInt(rowData.ucret)+(rowData.paket ? 0 : 15)+(rowData.odeme==='kapıda' ? 10 : 0)} ₺
               </>
             )}
           </Cell>
           </Column>
          <Column width={120} resizable>
            <HeaderCell>Ödeme</HeaderCell>
            <ÖdemeTürü dataKey="odeme"/>
          </Column>
          <Column width={120} resizable>
            <HeaderCell>Durum</HeaderCell>
            <DurumGöster dataKey="durum"/>
          </Column>
          <Column width={120} resizable>
            <HeaderCell>Tarih</HeaderCell>
           <Cell>
             {
               rowData=>(
                 <> {rowData.tarih.substring(0,10)+'  |  '+rowData.tarih.substring(12,19)}</>
               )
             }
           </Cell>
          </Column>
          <Column width={90} fixed="right" resizable>
            <HeaderCell>İşlemler</HeaderCell>
            <Aksiyon dataKey='Urunler'/>
          </Column>
        </Table>
      </div>
    )
    const Seçici=()=>(
      <Dropdown activeKey={this.state.aktifitem} title="Siparişleri Sırala" appearance="default">
        <Dropdown.Item eventKey='hepsi' onSelect={()=>this.siparisleriAl()}>Tümü           <Label circular>{this.siparisSayisiHesapla('hepsi')}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={0} onSelect={()=>this.sırala(0)}>Yeni Siparişler   <Label circular>{this.siparisSayisiHesapla(0)}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={1} onSelect={()=>this.sırala(1)}>Ödenenler         <Label circular>{this.siparisSayisiHesapla(1)}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={2} onSelect={()=>this.sırala(2)}>Hazırlanıyor      <Label circular>{this.siparisSayisiHesapla(2)}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={3} onSelect={()=>this.sırala(3)}>Hazırlandı        <Label circular>{this.siparisSayisiHesapla(3)}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={4} onSelect={()=>this.sırala(4)}>Kargoya Verilecek <Label circular>{this.siparisSayisiHesapla(4)}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={5} onSelect={()=>this.sırala(5)}>Kargoya Verildi   <Label circular>{this.siparisSayisiHesapla(5)}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={6} onSelect={()=>this.sırala(6)}>Teslim Edildi     <Label circular>{this.siparisSayisiHesapla(6)}</Label></Dropdown.Item>
        <Dropdown.Item eventKey={7} onSelect={()=>this.sırala(7)}>Pasif Siparişler  <Label circular>{this.siparisSayisiHesapla(7)}</Label></Dropdown.Item>
      </Dropdown>
    )

    return (

         <Panel style={{minHeight:'600px'}} bodyFill>
           {this.state.loading ?
             <Loader backdrop content="Yükleniyor..." vertical />
           :
           <>
             <Seçici/>
             <Divider/>
             <OrdersTable/>
             <Yazdırıcı/>
           </>
           }

         </Panel>

    );
  }
}

export default Siparisler;

