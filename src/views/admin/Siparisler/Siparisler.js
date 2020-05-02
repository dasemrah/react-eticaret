import React, { Component, } from 'react';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import {Table, Icon, Popover, Message, Whisper, Modal, Dropdown, Button, Panel} from "rsuite";
import {Label, List} from "semantic-ui-react";
import SiparisKart from "./Siparis/SiparisKart";
import api from '../../../istek'
class Siparisler extends Component {
  constructor(props){
    super(props)
    this.state={
      tumsiparisler:[],
      loading:true,
      siparişAç:false,
      sipariş:[]
    }
  }
  componentDidMount() {
    api
      .get('tumsiparisler')
      .then(ynt=>{
        console.log('tüm siparişler alındı',ynt.data.siparis)
        this.setState({tumsiparisler:ynt.data.siparis,loading:false})
      })

  }

  siparişAç=(data)=>{
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
       <Modal.Body>
         <Print>
          <Panel onClick={()=>window.print()}>
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
            <Table
              height={600 }
              width={600}
              data={sipariş.Urunler}
            >
              <Column width={120} align="center" fixed='left'>
                <HeaderCell>Ad</HeaderCell>
                <Cell dataKey="ad" />
              </Column>
              <Column width={200} align="center">
                <HeaderCell>Adet</HeaderCell>
                <Cell dataKey="miktar" />
              </Column>
              <Column width={200} align="center">
                <HeaderCell>Fiyat</HeaderCell>
                <Cell dataKey="fiyat" />
              </Column>
              <Column width={200} align="center">
                <HeaderCell>Miktar</HeaderCell>
                <Cell dataKey="net" />
              </Column>
            </Table>
          </Panel>
         </Print>
       </Modal.Body>

     </Modal>

   )
   const Aksiyon=({rowData, dataKey, ...props})=>{
      const yazdırıcı=(
        <Popover>
          <Message type="info" description="Bir sonraki ekrada çıktı almak için ürünlerin üzerine tıklayın.
          En iyi görüntü için 'Daha fazla ayar' bölümünden ölçeği 200 yapın" />
          <Button onClick={()=>this.siparişAç(rowData)}>Yazdır</Button>
        </Popover>
      )
     const ürünler=(
        <Popover title='Ürünler'>
          <Table
            height={360}
            width={360}
            data={rowData.Urunler}
          >
            <Column width={90} align="center" fixed='left'>
              <HeaderCell>Ad</HeaderCell>
              <Cell dataKey="ad" />
            </Column>
            <Column width={90} align="center">
              <HeaderCell>Adet</HeaderCell>
              <Cell dataKey="miktar" />
            </Column>
            <Column width={90} align="center">
              <HeaderCell>Fiyat</HeaderCell>
              <Cell dataKey="fiyat" />
            </Column>
            <Column width={90} align="center">
              <HeaderCell>Miktar</HeaderCell>
              <Cell dataKey="net" />
            </Column>
          </Table>
        </Popover>
     )
      const düzenle=(
        <Popover style={{width:'300px'}} title='Düzenle'>
            <Dropdown style={{width:'100%'}} title={rowData.durum}>
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
            <Whisper trigger='click' placement='autoHorizontal' speaker={ürünler}>
              <a> <Icon icon='shopping-basket'/> </a>
            </Whisper>|{' '}
            <Whisper trigger='click' placement='autoHorizontal' speaker={yazdırıcı}>
              <a> <Icon icon='print'/> </a>
            </Whisper>|{' '}
            <Whisper trigger='click' placement='autoHorizontalStart' speaker={düzenle}>
                <a> <Icon icon='edit'/> </a>
            </Whisper>
          </span>
        </Cell>
      )
   }

    const OrdersTable=()=>(
      <div>
        <Table
          wordWrap
          rowHeight={60}
          loading={this.state.loading}
          height={500}
          data={this.state.tumsiparisler}
        >
          <Column width={180}>
            <HeaderCell>Ad</HeaderCell>
            <Cell dataKey="ad" />
          </Column>

          <Column width={150}>
            <HeaderCell>Numara</HeaderCell>
            <Cell dataKey="telefon" />
          </Column>

          <Column width={300}>
            <HeaderCell>Adres</HeaderCell>
            <Cell dataKey="adres"/>
          </Column>
          <Column width={100}>
            <HeaderCell>Ücret</HeaderCell>
           <Cell>
             {rowData=>(
               <>
                 {parseInt(rowData.ucret)+(parseInt(rowData.ucret)>=250 || rowData.paket ? 0 : 15)+(rowData.odeme==='kapıda' ? 10 : 0)} ₺
               </>
             )}
           </Cell>
           </Column>
          <Column width={150}>
            <HeaderCell>Ödeme</HeaderCell>
            <ÖdemeTürü dataKey="odeme"/>
          </Column>
          <Column width={120}>
            <HeaderCell>Durum</HeaderCell>
            <DurumGöster dataKey="durum"/>
          </Column>
          <Column width={180}>
            <HeaderCell>Tarih</HeaderCell>
           <Cell>
             {
               rowData=>(
                 <> {rowData.tarih.substring(0,10)+'  |  '+rowData.tarih.substring(12,19)}</>
               )
             }
           </Cell>
          </Column>
          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Aksiyon dataKey='Urunler'/>
          </Column>
        </Table>
      </div>
    )
    return (

         <>
           <OrdersTable/>
           <Yazdırıcı/>
         </>

    );
  }
}

export default Siparisler;

