import React,{useState,useEffect} from "react";
import {Row,Col,Container} from 'reactstrap'
import {Step, Icon, Segment, Input, Header, List, Divider} from 'semantic-ui-react'
import {Alert, Table, Menu,toaster, Button ,TextInput, Textarea ,Pane ,Label} from 'evergreen-ui'
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
          toaster.success('Siparişiniz '+ynt.data.siparis.tarih+' tarihinde oluşturuldu')
          props.sepetiBosalt()
        }
        else {
          toaster.danger('Siparişiniz oluşturulamadı')
        }
      })
      .catch(err=>console.log(err))
  }
  const adresEkranKontrol=()=>{
    if(ad.length>0 && tel.length>0){
      setEkran('adres')
    }else {
      toaster.warning('Ad ve Soyad bilgilerinizi tamamlayınız')
    }
  }
  const ödemeEkranKontrol = () =>{
    if(il.length>0,ilce.length>0,mahalle.length>0,tamAdres.length>0){
      setEkran('ödeme')
    }else {
      toaster.warning('Lütfen adres bilgilerinizi tamamlayınız')
    }
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
       <Step onClick={()=>adresEkranKontrol()} active={ekran==='adres'}>
         <Icon color='orange' name='location arrow' />
         <Step.Content>
           <Step.Description>Adres</Step.Description>
         </Step.Content>
       </Step>
       <Step onClick={()=>ödemeEkranKontrol()} active={ekran==='ödeme'}>
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
    <Col xs="12" lg="4" md="4">
      <Segment raised>
        <Header as='h4' textAlign='center' dividing color='teal'>
          Sipariş Özeti
        </Header>
        <List>
         <List.Item>
          <Header as='h6' textAlign='center'>
            {
              props.sepet.length>0 ?
                <>
                  {props.sepet.length} ürün
                </>
                :
                <>
                {siparis.Urunler.length} ürün
                </>
            }
          </Header>
         </List.Item>
          <List.Item>
            <Header as='h5' textAlign='center'>
              Toplam: <span className="text-danger">
              {props.sepet.length>0 ?
              <>
                {ücret} ₺
              </>
                :
                <>
                  {siparis.ucret} ₺
               </>
              }
            </span>
            </Header>
          </List.Item>
        </List>
        <Divider/>
      </Segment>
      <br/>
    </Col>
  )
  const Kapıda = () =>(
    <Segment raised>
      <Header as='h4' textAlign='center' color='orange'>
        Kapıda Ödeme Seçildi
      </Header>
      <Header.Subheader>
        Sipariş ücretini kapıda ürünü teslim aldıktan sonra nakit veya kartla ödeyebilirsiniz.
      </Header.Subheader>
    </Segment>
  )
  const Banka=()=>(
    <Segment raised>
      <Header as='h4' textAlign='center' color='orange'>
        Banka Bilgileri
        <Header.Subheader>
          Mağazamızın anlaşmalı hesaplarına sipariş ücretini ödeyebilirsiniz.
        </Header.Subheader>
      </Header>
      <List>
        <List.Item>
          <Header block as='a' textAlign='center' dividing>
            Ziraat Bankası
            <Header.Subheader>
              <span> Şube: PAZARKÖY-NAZİLLİ/AYDIN ŞUBESİ</span><br/>
              <span>   Hesap Numarası: 2311-45204995-5004</span><br/>
              <span> IBAN: TR 4900 0100 2311 4520 4995 5004</span><br/>
              <span> SEVGÜL BATUR</span>
            </Header.Subheader>
          </Header>
        </List.Item>
        <List.Item>
          <Header as='a' block textAlign='center'>
            Garanti Bankası
            <Header.Subheader>
              <span> IBAN:TR14 0006 2000 4820 0006 6618 62</span><br/>
              <span>Sevgül Batur</span>
            </Header.Subheader>
          </Header>
        </List.Item>
        <List.Item>
          <Header as='a' block textAlign='center'>
            İş Bankası
            <Header.Subheader>
              <span> IBAN:TR380006400000130211158527</span><br/>
              <span>Sevgül Batur</span>
            </Header.Subheader>
          </Header>
        </List.Item>
      </List>
    </Segment>
  )
  const Yöntem=(e)=>{
    setÖdemeYöntemi(e);
    siparişTamamla();
  }
  const ÖdemeSeç=()=>(
    <Segment raised>
      <Header as='h4' textAlign='center' color='orange'>
        Ödeme Yöntemi Seçiniz
      </Header>
      <Menu>
        <Menu.Group>
          <Menu.Item icon='home' onSelect={() => Yöntem('kapıda')}>Kapıda ödeme ile sipariş vermek istiyorum</Menu.Item>
          <Menu.Item icon='credit-card' onSelect={() => Yöntem('havale')}>EFT / Havale ile ödeme yapmak istiyorum</Menu.Item>
        </Menu.Group>
        <Menu.Divider />
      </Menu>
    </Segment>
  )
  const ÖdendiEkranı=()=>(
    <>
      {
            ödemeYöntemi  === 'kapıda' ?
          <Kapıda/>
          : ödemeYöntemi  === 'havale' ?
          <Banka/>
          :null
      }
    </>
  )
  return(
    <Container>

        <Row>

              <>
                 <Adımlar/>
                <Col xs="12" lg="8" md="8">
                  {
                    ekran === 'bilgi' ?
                      <Segment raised >
                        <Header as='h4' textAlign='center' color='orange'>Alıcı Bilgileri</Header>
                        <TextInput
                          name="ad"
                          value={ad}
                          placeholder="Ad ve soyad girin..."
                          onChange={e => setAd(e.target.value)}
                          appearance='warning'
                          width={'100%'}
                        />

                        <br/><br/>
                        <TextInput
                          name="telefon"
                          value={tel}
                          placeholder="Telefon numaranız?..."
                          onChange={e => setTel(e.target.value)}
                          width={'100%'}
                        />
                        <br/>
                        <Pane>
                          <Label
                            htmlFor="not"
                            marginBottom={4}
                            display="block"
                          >
                            Siparişlerinizle ilgili bir notunuz varsa burada belirtiniz
                          </Label>
                          <Textarea id="not"
                            onChange={e=>setDetay(e.target.value)}
                            value={detay}
                            placeholder="Sipariş detayı..."
                          />
                        </Pane>
                        <br/>
                        <Button
                          height={24}
                          onClick={()=>adresEkranKontrol()}
                          appearance="primary"
                          marginRight={16}
                          intent="warning"
                          iconAfter='arrow-right'
                          Warning>
                         Adresi bilgileri için devam et
                         </Button>

                      </Segment>

                      :ekran === 'adres' ?
                      <Segment raised>
                        <Header as='h4' textAlign='center' color='orange'>Teslimat Adresi</Header>
                        <TextInput value={il} onChange={e => setIl(e.target.value)} placeholder="Şehir" type="text" required width={'100%'}/>
                        <br/>
                        <br/>
                        <TextInput value={ilce} onChange={e => setIlce(e.target.value)} placeholder="İlçe" type="text" required width={'100%'}/>
                        <br/>
                        <br/>
                        <TextInput value={mahalle} onChange={e => setMahalle(e.target.value)} placeholder="Mahalle" type="text" required width={'100%'}/>
                        <Pane>
                          <Label htmlFor="adres" marginBottom={4} display="block">
                            Detaylı adres
                          </Label>
                          <Textarea id="adres" onChange={e=>setTamAdres(e.target.value)} value={tamAdres} placeholder='cadde, sokak ve diğer bilgileri giriniz'
                          />
                        </Pane>

                        <Button
                          height={24}
                          onClick={()=>ödemeEkranKontrol()}
                          appearance="primary"
                          marginRight={16}
                          intent="warning"
                          iconAfter='arrow-right'
                        >
                          Ödemeye  Devam Et
                        </Button>

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
        </Row>
    </Container>
  )
}

export default Sipariş;
