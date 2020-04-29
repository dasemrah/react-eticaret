import React,{useState,useEffect} from "react";
import {Row,Col,Container} from 'reactstrap'
import { Header, List} from 'semantic-ui-react'
import { Menu,toaster ,TextInput, Textarea ,Pane ,Label,} from 'evergreen-ui'
import {Steps, Panel ,Message, Icon, Modal, Button} from "rsuite";
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
  const [kapıda ,KapıdaAyar] = useState('');
  const [ödendi, setÖdendi] = useState(false);
  const [step, setStep] = useState(0);
  const [kapıdamodal ,KapıdaModalAyar] = useState(false)
  const onChange = nextStep => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  useEffect(()=>{
      var toplam=0
      props.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
      ÜcretDeğiş(toplam)

})

  const siparişTamamla=(yöntem,kapıdaYontemi)=>{

    console.log('yöntem ic fonk',yöntem, kapıdaYontemi)
    let veriler={
      ad:   ad,
      adres:il+' '+ilce+ ' '+mahalle+' '+tamAdres,
      tel:  tel,
      odeme_yontemi:yöntem,
      kapıda       : kapıdaYontemi
    }

    var ucret=0
    props.sepet.map(urun=>ucret+=urun.fiyat*urun.miktar)
    api
      .post('/yenisiparis',{
        data:{
          ad            :   veriler.ad,
          telefon       :   veriler.tel,
          adres         :   veriler.adres,
          ucret         :   ucret,
          odeme_yontemi :   veriler.odeme_yontemi,
          urunler       :   props.sepet,
          kapida        :   veriler.kapıda
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
       <Steps.Item  title="Bilgilerim" />
       <Steps.Item title="Adresim" />
       <Steps.Item title="Ödeme" />
       <Steps.Item title="Tamamlandı" />
     </Steps>
   </Col>
  )
  const Detaylar = (e)=>(
    <div className="siparisim_katman">
      <div className="siparisim_ara_katman">
        <div className="siparisim_ic_katman">
          <h3 className="siparisim_baslik"> Siparişlerim</h3>
          <div className="siparisim_urunler_katman">
            <div className="siparisim_ic_kenar">
              {
                e.sip.map(urun=>
                  <div className="siparisim_eleman">
                    <span className="siparisim_adet">{urun.miktar}</span>
                    <span className="siparisim_carpi">X</span>
                    <span className="siparisim_urun_ad">{urun.ad} | {urun.net}</span>
                    <span className="siparisim_urun_fiyat">{parseInt(urun.fiyat)*parseInt(urun.miktar)} ₺</span>
                  </div>
                )
              }
            </div>
          </div>
          <div className="siparis_ucret_katman">
            <div className="siparis_ucret_eleman">
              <span className="siparis_ucret_eleman_baslik">Ara Toplam</span>
              <span className="siparis_ucret_eleman_icerik">{ödendi ? siparis.ucret : ücret} ₺</span>
            </div>
            <div className="siparis_ucret_eleman">
              <span className="siparis_ucret_eleman_baslik">Kargo Ücreti</span>
              <span className="siparis_ucret_eleman_icerik">
                {ödendi ?
                  siparis.ucret>=250 ?  <>Ücretsiz</>
                    :<>15 ₺</>
                  :ücret>=250 ? <>Ücretsiz</>
                    : <>15 ₺</>
                  }
              </span>
            </div>
            {
              ödendi ?
                siparis.odeme === 'kapıda' ?
                  <div className="siparis_ucret_eleman">
                    <span className="siparis_ucret_eleman_baslik">Kapıda Ödeme Ücreti</span>
                    <span className="siparis_ucret_eleman_icerik">+10 ₺</span>
                  </div>
                  :null
                :null
            }
            <div className="siparis_ucret_eleman_toplam">
              <span className="siparis_ucret_eleman_baslik_toplam">Toplam</span>
              <span className="siparis_ucret_eleman_icerik_toplam">
                {
                  ödendi ?
                    <>
                      {(siparis.odeme==='kapıda' ? 10 : 0) + parseInt(siparis.ucret)+(parseInt(siparis.ucret)>=250 ? 0 : 15)} ₺
                    </>
                    :
                    <>
                      {ücret+(ücret>= 250 ? 0 : 15)} ₺
                    </>
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  const Kapıda = () =>(
    <Panel className="siparis_panellerim" shaded header={siparis.tarih +' tarihli siparişiniz başarıyla alındı'}>
      <Message
        showIcon
        type="success"
        title="Kapıda Ödeme Seçildi"
        description={'Sipariş ücretini kapıda, ürünü teslim aldıktan sonra '+siparis.kapida+' ödeyebilirsiniz. Kargonuz yola çıktığında sizi bilgilendireceğiz'}
      />
    </Panel>
  )
  const Banka=()=>(
    <Panel className="siparis_panellerim" shaded header={siparis.tarih +' tarihli siparişiniz başarıyla alındı'}>
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
  const Yöntem=(o_y,k_o_y)=>{
    setÖdemeYöntemi(o_y);
    console.log('belirlenen yöntem-->' ,ödemeYöntemi);
    onChange(2)
    siparişTamamla(o_y,k_o_y);
  }
  const KapıdaYontem=(o_y,k_o_y)=>{
    Yöntem(o_y,k_o_y)
    console.log('kapıda ödeme şekli',k_o_y)
    KapıdaModalAyar(false)
  }
  const KapıdaSecici=()=>(
    <Modal show={kapıdamodal} onHide={()=>KapıdaModalAyar(false)}>
      <Modal.Header>

      </Modal.Header>
      <Modal.Body>
        <Panel className="siparis_panellerim" shaded header='Ücreti Kapıda Nasıl Ödemek İstersiniz?'>
          <Menu>
            <Menu.Group>
              <Menu.Item icon='dollar' onSelect={() => KapıdaYontem('kapıda','nakit')}>Nakit Ödeyeceğim</Menu.Item>
              <Menu.Item icon='credit-card' onSelect={() => KapıdaYontem('kapıda','kartla')}>Kartla Ödeme Yapacağım</Menu.Item>
            </Menu.Group>
            <Menu.Divider />
          </Menu>
        </Panel>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>KapıdaModalAyar(false)} appearance="subtle">
          İptal
        </Button>
      </Modal.Footer>
    </Modal>
  )
  const ÖdemeSeç=()=>(
    <Panel className="siparis_panellerim" shaded header=' Ödeme Yöntemi Seçiniz'>
      <Menu>
        <Menu.Group>
          <Menu.Item icon='home' onSelect={() => KapıdaModalAyar(true)}>Kapıda ödeme ile sipariş vermek istiyorum</Menu.Item>
          <Menu.Item icon='credit-card' onSelect={() => Yöntem('havale')}>EFT / Havale ile ödeme yapmak istiyorum</Menu.Item>
        </Menu.Group>
        <Menu.Divider />
      </Menu>
    </Panel>
  )
  const  Başarısız =()=>(
      <Panel className="siparis_panellerim" shaded header='Hata'>
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
  const Butonlarım=(e)=>
    <div className="adres_buton_katman">
      <button onClick={()=>e.fonk()} className="adres_buton">
        <span className="adres_buton_text">{e.ad} </span>
        <Icon style={{color:'rgb(255, 255, 255)',marginLeft:'10px'}} icon='angle-right' />
      </button>
    </div>

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
                <KapıdaSecici/>
                 <Adımlar/>
                <br/><br/>
                <Col xs="12" lg="7" md="7">
                  {
                    step === 0 ?
                      <Panel className="siparis_panellerim" shaded header='Bilgilerim'>

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
                       <Butonlarım ad='Adres Bilgisi' fonk={adresEkranKontrol}/>
                      </Panel>

                      :step === 1 ?
                      <Panel className="siparis_panellerim" shaded header='Adresim'>
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
                        <Butonlarım ad='Ödeme' fonk={ödemeEkranKontrol}/>

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
                  <Detaylar sip={props.sepet.length>0 ? props.sepet : siparis.Urunler}/>
                </Col>
              </>
        </Row>
    </Container>
  )
}

export default Sipariş;
