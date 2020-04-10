import React,{useState,useEffect} from "react";
import {Row,Col,Container} from 'reactstrap'
import {Button,Step,Icon,Segment,Input ,Header,Label,TextArea} from 'semantic-ui-react'
import {Alert,Table} from 'evergreen-ui'
import api from "../../../istek";
const Sipariş =props=>{
  const [ad, setAd]         =useState("");
  const [adres, setAdres]   =useState("");
  const [tel,setTel]        =useState("")
  const [detay,setDetay]    =useState("")
  const [olay,setOlay]      =useState(false);
  const [ücret,ÜcretDeğiş]  =useState(0);
  const [siparis,setSiparis]=useState([])

  useEffect(()=>{
      var toplam=0
      props.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
      ÜcretDeğiş(toplam)
      console.log('sipariş sayfa props',props)
  })

  const siparişTamamla=()=>{
    let veriler={
      ad:   ad,
      adres:adres,
      tel:  tel
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
          urunler     :   props.sepet,
        }
      })
      .then(ynt=>{
        console.log('yanıt',ynt.data)
       setOlay(true)
        setSiparis(ynt.data.siparis)
        props.sepetiBosalt()
      })
      .catch(err=>console.log(err))
  }

  return(
    <Container className="sipariş_onay">
      {olay ?
      <Alert intent="success" title="Siparişiniz Başarıyla Kaydedildi! Sipariş ayrıntıları ve ödeme bilgisi için telefonunuza gelen mesaja bakınız."/>
        :
        <Row>
          {
            props.sepet.length === 0 ?
              <>
              {ad.length>0 && adres.length>0 && tel.length>0
                ? null
                :
                <Col xs="12">
                  <Alert
                    intent="none"
                    title="Sepette Hiç Ürün Yok."
                    marginBottom={32}
                  />
                </Col>
              }
              </>
              :
              <>
                <Col xs="12">
                  <Step.Group className="adım" unstackable>
                    <Step  onClick={()=>props.history.push('/kategori')}>
                      <Icon name='shopping basket' />
                      <Step.Content>
                        <Step.Description>Alışveriş yap</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step active>
                      <Icon name='info circle' />
                      <Step.Content>
                        <Step.Description>Kargo bilgileri</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step disabled>
                      <Icon name='dollar' />
                      <Step.Content>
                        <Step.Description>Siparişi tamamla</Step.Description>
                      </Step.Content>
                    </Step>
                  </Step.Group>
                </Col>
                <Col xs="12">
                  <br/><br/>
                  <Alert
                    intent="none"
                    title="Aşağıdan Kargo Bilgilerini Giriniz."
                    marginBottom={32}
                  />
                </Col>
                <Col xs="12" lg="6" md="6">
                  <br/>
                  <Segment color="pink">
                    <Header as='h3' textAlign='center'>
                      Sipariş Özeti   <Label circular color='black'> {props.sepet.length}</Label> ürün
                    </Header>
                    <Table>
                      <Table.Head>
                        <Table.TextHeaderCell>Ürün</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Miktar</Table.TextHeaderCell>
                        <Table.TextHeaderCell>₺</Table.TextHeaderCell>
                      </Table.Head>
                      <Table.VirtualBody height={240}>
                        {props.sepet.map(urun => (
                          <Table.Row key={urun._id} isSelectable onSelect={() => props.açKapa()}>
                            <Table.TextCell><img src={urun.img} style={{width: '55px'}} alt=""/>{urun.ad}</Table.TextCell>
                            <Table.TextCell>{urun.miktar}</Table.TextCell>
                            <Table.TextCell isNumber>
                              {urun.miktar * urun.fiyat}
                            </Table.TextCell>
                          </Table.Row>
                        ))}
                      </Table.VirtualBody>

                    </Table>
                    <span className="text-center text-uppercase text-muted h4">toplam ücret: {ücret} ₺</span>
                  </Segment>
                  <br/>
                </Col>
                <Col xs="12" lg="6" md="6">
                  <br/>
                  <Segment color="orange">
                    <Header as='h3' textAlign='center'>Müşteri Bilgileri</Header>
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
                      label={{ icon: 'location arrow' ,color:'orange'}}
                      labelPosition='left corner'
                      value={adres}
                      onChange={e => setAdres(e.target.value)}
                      placeholder="Adres"
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
                      onChange={e=>setDetay(e.target.value)}
                      value={detay}
                      placeholder='Sipariş detayı...'
                    />
                    <br/>
                    <Button positive content='Siparişi Onayla' icon='right arrow' labelPosition='right'
                            onClick={siparişTamamla} className="btn-success"/>
                  </Segment>
                  <br/>
                </Col>
              </>
          }
        </Row>}
    </Container>
  )
}

export default Sipariş;
