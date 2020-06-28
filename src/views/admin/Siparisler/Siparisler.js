import React, { Component, } from 'react';
import { Print } from 'react-easy-print';
import {Table, Icon,Panel, Alert, Message, Modal, Dropdown, Button, Divider, IconButton, Whisper, Popover} from "rsuite";
import {Label, List, Popup} from "semantic-ui-react";
import {Row, Col} from 'reactstrap'

import Arama from "./Ara";
import Edit from "./Edit";
import api from '../../../istek'
import SiparisKart from "./SiparisKart";
class Siparisler extends Component {
  constructor(props){
    super(props)
    this.state={
      tumsiparisler : [],
      siparişsayısı : [],
      loading       : false,
      siparişAç     : false,
      sipariş       : [],
      aktifitem     : 0,
      alındı:false,
      goster:[],
      edit:{},
      show:false,
      editor:false,
      ac:{}
    }
  }
  componentDidMount() {
    this.siparisleriAl()
  }


  siparisGuncelle=(siparis) => {

    let index = this.state.goster.findIndex(p => p._id  === siparis._id)
    let asılNesne = this.state.goster[index]
    console.log('bulunan sipariş-->',asılNesne)
    asılNesne={...siparis}
    api
      .post('siparisduzenle', asılNesne)
      .then(ynt => {

        console.log('düzenle cevap',ynt.data)
        if(ynt.data.status){
          Alert.success('Sipariş güncellendi', 5000)
          this.state.goster[index] = asılNesne
          this.setState({
            editor:false,
            ac:asılNesne,
          })
        }else {
          console.log(ynt.data)
          Alert.error('bir hata oluştu')
        }

      })
      .catch(err => {
        Alert.error('Bir hata oluştu')
        console.log(err)
      })
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
  duzenle = () => {
    Alert.info('Düzenlemek istediğiniz bilgileri yazıp Kaydet butonuna basınız',5000)
    this.setState({editor:true})
  }
  ac=(siparis) => {
    Alert.info('Sipariş detayı açıldı',3000)
    this.setState({
      ac:siparis,
      show:true
    })
  }
  kapat =() => {
    Alert.info('Önizleme kapatıldı',3000)
    this.setState({show:false, editor:false})
  }
  onizle = () => {
    Alert.info('Önizlemeye geçildi',5000)
    this.setState({editor:false})
  }
  siparişSil=(s)=>{

    if(s.durum===7){
      this.setState({loading:true})
      let index=this.state.goster.findIndex(p=>p._id===s._id)
      let index_1=this.state.siparişsayısı.findIndex(p=>p._id===s._id)
      api
        .post('siparissil',{siparisid:s._id})
        .then(ynt=>{
          if(index>=0 && ynt.data.olay === 1){
            this.state.goster.splice(index, 1)
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
        this.sırala(0)
      })
  }
  aramaSonucu=(sonuc) => {
    let fakedizi = []
    fakedizi.push(sonuc)
    console.log('sonuç geldi', sonuc)
    this.setState({loading:true})
    this.setState({
      goster:fakedizi,
      loading:false,
    })
  }
  sırala=(seviye)=>{
    this.setState({loading:true})
    if(seviye === 'tümü'){
      this.setState({
        goster:this.state.tumsiparisler,
        aktifitem:seviye,
        loading:false,
        alındı:true
      })
    }
  api
    .get('siparisler/'+seviye)
    .then(ynt=>{
      this.setState({
        goster:ynt.data.orders,
        aktifitem:seviye,
        loading:false,
        alındı:true
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
        let index= this.state.goster.findIndex(p=>p._id===order._id)
        let index1 = this.state.tumsiparisler.findIndex( p => p._id === order._id)
        console.log('ürün index',index)
        order.durum=seviye
        this.state.goster[index]=order
        this.state.tumsiparisler[index1] = order
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





   const Aksiyon=({rowData, dataKey, ...props})=>{

      const düzenle=(
        <Popover title='Sipariş Ayarları'>
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
        </Popover>
      )
      return(
        <Cell {...props}>

          <span>
          <Whisper placement='leftStart' trigger='click' speaker={düzenle}>
           <IconButton size='sm' circle color='grey' icon={<Icon icon='cog' />}/>
          </Whisper>
            |{' '}
            <IconButton color='green' icon={<Icon icon='info' />} size='md'  onClick={() => this.ac(rowData)} />
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
          data={this.state.goster}
        >
          <Column flexGrow={2}>
            <HeaderCell >Ad</HeaderCell>
            <Cell dataKey="ad" />
          </Column>
          <Column  flexGrow={1}>
            <HeaderCell>Ücret</HeaderCell>
           <Cell>
             {rowData=>(
               <>
                 {parseInt(rowData.ucret)+(rowData.odeme==='kapıda' ? 25 : 0)} ₺
               </>
             )}
           </Cell>
           </Column>

          <Column flexGrow={2}>
            <HeaderCell>Durum</HeaderCell>
            <DurumGöster dataKey="durum"/>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Tarih</HeaderCell>
           <Cell>
             {
               rowData=>(
                 <> {rowData.tarih.substring(0,10)}</>
               )
             }
           </Cell>
          </Column>
          <Column flexGrow={2}>
            <HeaderCell>İşlemler</HeaderCell>
            <Aksiyon dataKey='Urunler'/>
          </Column>
        </Table>
      </div>
    )
    const Seçici=()=>(
      <Dropdown className="siparis_secici" activeKey={this.state.aktifitem} title="Siparişleri Sırala" appearance="default">
        <Dropdown.Item eventKey='hepsi' onSelect={()=>this.sırala('tümü')}>Tümü           <Label circular>{this.siparisSayisiHesapla('hepsi')}</Label></Dropdown.Item>
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
            <div className="siparis_header">
              <Row>
                <Col className='head' xs='3'>
                  <h2>Siparişler</h2>
                </Col>
                <Col className="ozel" xs='9'>
                  <Row>
                    <Col xs='6'>
                      <Seçici/>
                    </Col>
                    <Col xs='6'>
                      <Arama {...this.props} siparisler={this.state.tumsiparisler} sonuc={this.aramaSonucu}/>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <SiparisKart
              siparis={this.state.ac}
              show={this.state.show}
              kapat={this.kapat}
              guncelle={this.siparisGuncelle}
              duzenle={this.duzenle}
              onizle={this.onizle}
              editor={this.state.editor}
            />
             <OrdersTable/>
         </Panel>

    );
  }
}

export default Siparisler;

