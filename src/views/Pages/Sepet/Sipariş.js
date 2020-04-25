import React,{useState,useEffect} from "react";
import {Row,Col,Container} from 'reactstrap'
import { Segment, Header, List, Divider} from 'semantic-ui-react'
import { Menu,toaster, Button ,TextInput, Textarea ,Pane ,Label, Table} from 'evergreen-ui'
import {Steps, Panel ,Message} from "rsuite";
import api from "../../../istek";


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
  const [step, setStep] = useState(0);

  const onChange = nextStep => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

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
          onChange(3)
          setSiparis(ynt.data.siparis)
          console.log('sipariş oluştu',ynt.data.siparis)
          toaster.success('Siparişiniz '+ynt.data.siparis.tarih+' tarihinde oluşturuldu')
          props.sepetiBosalt()
        }
        else {
          setÖdendi(false)
          toaster.danger('Siparişiniz oluşturulamadı')
        }
      })
      .catch(err=>console.log(err))
  }
  const adresEkranKontrol=()=>{
    if(ad.length>0 && tel.length>0){
      onChange(step+1)
    }else {
      toaster.warning('Ad ve Soyad bilgilerinizi tamamlayınız')
    }
  }
  const ödemeEkranKontrol = () =>{
    if(il.length>0,ilce.length>0,mahalle.length>0,tamAdres.length>0){
      onChange(step+1)
    }else {
      toaster.warning('Lütfen adres bilgilerinizi tamamlayınız')
    }
  }
  const Adımlar=()=>(
   <Col xs='12'>
     <Steps current={step}>
       <Steps.Item title="Bilgilerim" />
       <Steps.Item title="Adresim" />
       <Steps.Item title="Ödeme" />
       <Steps.Item title="Tamamlandı" />
     </Steps>
   </Col>
  )

  const SiparişDetayı=()=>(

      <Panel header=' Sipariş özeti' shaded >
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
      </Panel>

  )
  const Urunlerim =s=>{
    console.log('sipariş nesnesi',s)
    return(
      <Panel header='Ürünlerim' shaded>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Ürün</Table.TextHeaderCell>
            <Table.TextHeaderCell>Miktar</Table.TextHeaderCell>
            <Table.TextHeaderCell>Ücret</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {
              s.sip.map(e => (
                <Table.Row height='auto' key={e._id} isSelectable>
                  <Table.TextCell>{e.ad}</Table.TextCell>
                  <Table.TextCell isNumber>{e.miktar}</Table.TextCell>
                  <Table.TextCell isNumber>{e.fiyat}</Table.TextCell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </Panel>
    )
  }
  const Kapıda = () =>(
    <Panel shaded header={siparis.tarih +' tarihli siparişiniz başarıyla alındı'}>
      <Message
        showIcon
        type="success"
        title="Kapıda Ödeme Seçildi"
        description="Sipariş ücretini kapıda, ürünü teslim aldıktan sonra, nakit veya kartla ödeyebilirsiniz.
        Kargonuz yola çıktığında sizi bilgilendireceğiz.

        "
      />
    </Panel>
  )
  const Banka=()=>(
    <Panel shaded header={siparis.tarih +' tarihli siparişiniz başarıyla alındı'}>
      <Message
        showIcon
        type="success"
        title="Siparişiniz alındı"
        description="Siparişlerin hazırlanmaya başlanması için sipariş ücretini ödemeniz gerekmekte.
        Mağazamızın anlaşmalı hesaplarına sipariş ücretini ödeyebilirsiniz. Ödemeyi yaptıktan sonra bize haber veriniz. "
      />
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
    </Panel>
  )
  const Yöntem=(e)=>{
    console.log('belirlenen yöntem-->' ,ödemeYöntemi);
    onChange(2)
    setÖdemeYöntemi(e);
    siparişTamamla();
  }
  const ÖdemeSeç=()=>(
    <Panel shaded header=' Ödeme Yöntemi Seçiniz'>
      <Menu>
        <Menu.Group>
          <Menu.Item icon='home' onSelect={() => Yöntem('kapıda')}>Kapıda ödeme ile sipariş vermek istiyorum</Menu.Item>
          <Menu.Item icon='credit-card' onSelect={() => Yöntem('havale')}>EFT / Havale ile ödeme yapmak istiyorum</Menu.Item>
        </Menu.Group>
        <Menu.Divider />
      </Menu>
    </Panel>
  )
  const  Başarısız =()=>(
      <Panel shaded header='Hata'>
        <Message>

          <Message
            showIcon
            type="error"
            title="Bir hata oluştu"
            description="Siparişiniz alınırken bir hata ile karşılaşıldı"
          />
        </Message>
      </Panel>
  )
  const ÖdendiEkranı=()=>(
    <>
      {
           ödendi ?
             ödemeYöntemi  === 'kapıda' ?
               <Kapıda/>
               : ödemeYöntemi  === 'havale' ?
               <Banka/>
               :null
             :<Başarısız/>
      }
    </>
  )
  return(
    <Container>

        <Row>

              <>
                 <Adımlar/>
                <br/><br/>
                <Col xs="12" lg="7" md="7">
                  {
                    step === 0 ?
                      <Panel shaded header='Bilgilerim'>

                        <TextInput
                          name="ad"
                          value={ad}
                          placeholder="Ad ve soyad"
                          onChange={e => setAd(e.target.value)}
                          appearance='warning'
                          width={'100%'}
                        />

                        <br/><br/>
                        <TextInput
                          name="telefon"
                          value={tel}
                          placeholder="Telefon numarası"
                          onChange={e => setTel(e.target.value)}
                          width={'100%'}
                        />
                        <br/><br/>
                        <Pane>
                          <Textarea id="not"
                            onChange={e=>setDetay(e.target.value)}
                            value={detay}
                            placeholder="Sipariş detayı ( Siparişlerinizle ilgili bir notunuz varsa burada belirtiniz)"
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

                      </Panel>

                      :step === 1 ?
                      <Panel shaded header='Adresim'>
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

                      </Panel>
                       :step === 2 ?
                          <ÖdemeSeç/>
                        :step === 3 ?
                          <ÖdendiEkranı/>
                          :null

                  }
                  <br/>
                </Col>
                <Col xs='12' lg='5' md='5'>
                  <Row>
                    <Col xs='12'><SiparişDetayı/></Col>
                    <Col xs='12'><Urunlerim sip={props.sepet.length>0 ? props.sepet : siparis.Urunler}/></Col>
                  </Row>
                </Col>
              </>
        </Row>
    </Container>
  )
}

export default Sipariş;
