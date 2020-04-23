import React,{useState,useEffect} from "react";
import {Row,Col,Container} from 'reactstrap'
import {Button, Step, Icon, Segment, Input ,Header, Label, TextArea} from 'semantic-ui-react'
import {Alert, Table, Menu,toaster} from 'evergreen-ui'
import api from "../../../istek";
import SiparişTamam from "./SiparişTamam";
const Sipariş =props=>{
  const [ad, setAd]         =useState("");
  const [tel,setTel]        =useState("")
  const [detay,setDetay]    =useState("")
  const [ücret,ÜcretDeğiş]  =useState(0);
  const [siparis,setSiparis]=useState([])
  const [ekran, setEkran] = useState('bilgi')
  const [il, setIl] = useState('')
  const [ilce, setIlce] = useState('')
  const [mahalle, setMahalle] = useState('')
  const [tamAdres, setTamAdres]=useState('');
  const [ödemeYöntemi, setÖdemeYöntemi] = useState('');
  const [ödendi, setÖdendi] = useState(false);
  useEffect(()=>{
      var toplam=0
      props.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
      ÜcretDeğiş(toplam)
      console.log('sipariş sayfa props',props)
  })

  const siparişTamamla=()=>{
    let veriler={
      ad:   ad,
      adres:il+' '+ilce+ ' '+mahalle+' '+tamAdres,
      tel:  tel,
      odeme_yontemi:ödemeYöntemi,
    }
    var ucret=0
    props.sepet.map(urun=>ucret+=urun.fiyat*urun.miktar)
    api
      .post('/yenisiparis',{
        data:{
          ad          :   veriler.ad,
          telefon     :   veriler.tel,
          adres       :   veriler.adres,
          ucret       :   ucret,
          odeme_yontemi : veriler.odeme_yontemi,
          urunler     :   props.sepet,
        }
      })
      .then(ynt=>{
        console.log('yanıt',ynt.data)
        if(ynt.data.olay){
          setÖdendi(true)
          setSiparis(ynt.data.siparis)
          console.log('sipariş oluştu',ynt.data.siparis)
          toaster.success('Siparişiniz'+ynt.datasiparis.tarih+ ' tarihinde oluşturuldu')
          props.sepetiBosalt()
        }
        else {
          toaster.danger('Siparişiniz oluşturulamadı')
        }
      })
      .catch(err=>console.log(err))
  }

  const Adımlar=()=>(
   <Col xs='12'>
     <Step.Group  size='mini' className="adım" unstackable>
       <Step onClick={()=>setEkran('bilgi')} active={ekran==='bilgi'}>
         <Icon color='blue' name='user' />
         <Step.Content>
           <Step.Description>Müşteri Bilgileri</Step.Description>
         </Step.Content>
       </Step>
       <Step onClick={()=>setEkran('adres')} active={ekran==='adres'}>
         <Icon color='orange' name='location arrow' />
         <Step.Content>
           <Step.Description>Adres</Step.Description>
         </Step.Content>
       </Step>
       <Step onClick={()=>setEkran('ödeme')} active={ekran==='ödeme'}>
         <Icon color='teal' name='shopping cart' />
         <Step.Content>
           <Step.Description>Ödeme</Step.Description>
         </Step.Content>
       </Step>
     </Step.Group>
     <br/><br/>
   </Col>
  )
  const ÜrünYokUyarısı=()=>(
    <Col xs="12">
      <Alert intent="none" title="Sepette Hiç Ürün Yok." marginBottom={32}
      />
    </Col>
  )
  const SiparişDetayı=()=>(
    <Col xs="12" lg="5" md="5">
      <Segment raised>

        <Header as='h4' textAlign='center' dividing>
          Sipariş Özeti
          <Header.Subheader>
            {props.sepet.length} ürün
          </Header.Subheader>
        </Header>

        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Ürün</Table.TextHeaderCell>
            <Table.TextHeaderCell> </Table.TextHeaderCell>
            <Table.TextHeaderCell>Miktar</Table.TextHeaderCell>
            <Table.TextHeaderCell>₺</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {props.sepet.map(urun => (
              <Table.Row height="auto" key={urun._id} isSelectable onSelect={() => props.açKapa()}>
                <Table.TextCell><img src={urun.img} style={{width: '55px'}} alt=""/></Table.TextCell>
                <Table.TextCell>{urun.ad}</Table.TextCell>
                <Table.TextCell>{urun.miktar}</Table.TextCell>
                <Table.TextCell isNumber>
                  {urun.miktar * urun.fiyat}
                </Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>

        </Table>
        <br/>
        <span className="text-center text-uppercase text-dark h4">toplam ücret: {ücret} ₺</span>
      </Segment>
      <br/>
    </Col>
  )

  const Banka=()=>(
    <>
      <Header as='a' textAlign='center' dividing>
        <Header.Subheader>
          
        </Header.Subheader>
      </Header>
    </>
  )
  const Yöntem=(e)=>{
    setÖdemeYöntemi(e);
    siparişTamamla();
  }
  const ÖdemeSeç=()=>(
    <>
      <Header as='h3' textAlign='center' dividing>
        Ödeme Yöntemi Seçiniz
      </Header>
      <Menu>
        <Menu.Group>
          <Menu.Item icon='home' onSelect={() => Yöntem('kapıda')}>Kapıda ödeme ile sipariş vermek istiyorum</Menu.Item>
          <Menu.Item icon='credit-card' onSelect={() => Yöntem('havale')}>EFT / Havale ile ödeme yapmak istiyorum</Menu.Item>
        </Menu.Group>
        <Menu.Divider />
      </Menu>
    </>
  )
  const ÖdendiEkranı=()=>(
    <>
      {
        ödemeYöntemi=== 'kapıda' ?
          <span>Sipariş Kapıda Ödenecek</span>
          : ödemeYöntemi === 'havale' ?
          <span>
            Hesap Bilgileri
          </span>
          :null
      }
    </>
  )
  return(
    <div>

        <Row>
          {
            props.sepet.length === 0 ?
              <ÜrünYokUyarısı/>
              :
              <>
                 <Adımlar/>
                <Col xs="12" lg="7" md="7">
                  {
                    ekran === 'bilgi' ?
                      <Segment raised >
                        <Header as='h4' textAlign='center' dividing>Müşteri Bilgileri</Header>
                        <Input
                          fluid
                          label={{ icon: 'user',color:'teal' }}
                          labelPosition='left corner'
                          value={ad}
                          onChange={e => setAd(e.target.value)}
                          placeholder="Ad Soyad"
                          type="text"
                          required
                        />
                        <br/>
                        <Input
                          fluid
                          label={{ icon: 'phone' ,color:'blue' }}
                          labelPosition='left corner'
                          value={tel}
                          onChange={e => setTel(e.target.value)}
                          placeholder="Telefon"
                          type="phone"
                          required
                        />
                        <br/>
                        <TextArea
                          style={{width:'100%'}}
                          onChange={e=>setDetay(e.target.value)}
                          value={detay}
                          placeholder='Sipariş detayı...'
                        />
                        <br/>
                        <Button positive content='Adres için devam et' icon='location arrow' labelPosition='right'
                                onClick={()=>setEkran('adres')} className="btn-success"/>
                      </Segment>

                      :ekran === 'adres' ?
                      <Segment raised>
                        <Header as='h3' textAlign='center'>Kargo Adresi</Header>
                        <Input fluid value={il} onChange={e => setIl(e.target.value)} placeholder="Şehir" type="text" required/>
                        <Input fluid value={ilce} onChange={e => setIlce(e.target.value)} placeholder="İlçe" type="text" required/>
                        <Input fluid value={mahalle} onChange={e => setMahalle(e.target.value)} placeholder="Mahalle" type="text" required/>
                        <TextArea
                          style={{width:'100%'}}
                          onChange={e=>setTamAdres(e.target.value)}
                          value={tamAdres}
                          placeholder='cadde, sokak ve diğer bilgileri giriniz'
                        />
                        <Button positive content='Ödemeye  Devam Et' icon='shopping cart' labelPosition='right'
                                onClick={()=>setEkran('ödeme')} className="btn-success"/>
                      </Segment>
                       :ekran === 'ödeme' ?
                        ödendi ?
                          <ÖdendiEkranı/>
                          :
                          <ÖdemeSeç/>
                        :null

                  }
                  <br/>
                </Col>
              <SiparişDetayı/>
              </>
          }
        </Row>
    </div>
  )
}

export default Sipariş;
