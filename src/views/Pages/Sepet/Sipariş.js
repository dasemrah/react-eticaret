import React,{useState,useEffect} from "react";
import {Row,Col,Jumbotron,Input,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap'
import {Button} from 'semantic-ui-react'
import {Alert,Table,Pill} from 'evergreen-ui'
import api from "../../../istek";

const Sipariş =props=>{
  const [ad, setAd] = useState("");
  const [adres, setAdres] = useState("");
  const [tel,setTel]=useState("")
  const [olay,setOlay] = useState(false)
  const [ücret,ÜcretDeğiş]=useState(0);

  useEffect(()=>{
      var toplam=0
      props.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
      ÜcretDeğiş(toplam)
      console.log('sipariş sayfa props',props)
  },[])

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
          urunler     :   this.props.sepet,
        }
      })
      .then(ynt=>{
        console.log('yanıt',ynt.data)
       setOlay(true)
        props.sepetiBosalt()
      })
      .catch(err=>console.log(err))
  }

  return(
    <div className="sipariş_onay">
      {olay ?
        <Alert
          intent="success"
          title="Siparişinizi Aldık!"
          marginBottom={32}
        />
        :
        <Row>
          {
            props.sepet.length === 0 ?
              <>
                <Col xs="12">
                  <Alert
                    intent="none"
                    title="Sepette Hiç Ürün Yok."
                    marginBottom={32}
                  />
                </Col>
              </>
              :
              <>
                <Col xs="12">
                  <br/><br/>
                  <Alert
                    intent="none"
                    title="Aşağıdan Kargo Bilgilerini Giriniz."
                    marginBottom={32}
                  />
                </Col>
                <Col xs="12">
                  <Jumbotron>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType={"prepend"}>
                        <InputGroupText>
                          <i className="icon-user text-success"> </i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={ad}
                        onChange={e => setAd(e.target.value)}
                        placeholder="Ad Soyad"
                        type="text"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType={"prepend"}>
                        <InputGroupText>
                          <i className="icon-location-pin text-warning"> </i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={adres}
                        onChange={e => setAdres(e.target.value)}
                        placeholder="Adres"
                        type="text"
                        required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType={"prepend"}>
                        <InputGroupText>
                          <i className="icon-phone text-info"> </i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={tel}
                        onChange={e => setTel(e.target.value)}
                        placeholder="Telefon"
                        type="phone"
                        required
                      />
                    </InputGroup>
                    <Button positive content='Siparişi Onayla' icon='right arrow' labelPosition='right'
                            onClick={siparişTamamla} className="btn-success"/>
                  </Jumbotron>
                </Col>
                <Col xs="12">
                  <Jumbotron>
                  <span className="h5 text-uppercase text-muted">sİparİŞ Özetİ
                   <Pill display="inline-flex" margin={8} color="red" isSolid>{props.sepet.length} ürün</Pill>
                  </span>
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
                  </Jumbotron>
                </Col>
              </>
          }
        </Row>}
    </div>
  )
}

export default Sipariş;
