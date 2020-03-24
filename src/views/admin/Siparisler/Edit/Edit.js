import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';

import {
  Button,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  InputGroupText,Alert,
  Input,ModalBody,ModalHeader,
  Badge,
  InputGroupAddon,
  Modal, ModalFooter
} from 'reactstrap';
import istek from '../../../../istek'
import Jumbotron from "reactstrap/es/Jumbotron";
import '../../../../style.css'
class Edit extends Component{
  constructor(props){
    super(props)
  this.state={
    siparis:this.props.siparis,
    modal:false,
    olay:0,
    tumurunler:this.props.tumUrunler,
    yeniurunler:[],
    kg:'',
    ucret:'',
    yenidensiparisolay:0
  }

    this.urunhandleChange=this.urunhandleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.toggle=this.toggle.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.yeniHandleChange=this.yeniHandleChange.bind(this);
    this.siparisSil=this.siparisSil.bind(this);
    this.azalt=this.azalt.bind(this);


    this.state.siparis.Urunler !==null ?
    this.state.siparis.Urunler.map(e=>
    {  let urunnesne={
      urun:e.urun,
      kg:e.kg
    }
      this.state.yeniurunler.push(urunnesne)}
    )
      :
    console.log('Yeni ürünler => ',this.state.yeniurunler);


  }
  urunhandleChange(e){
    let {value,name} =e.target
    var index;
    var indexnum=0
    this.state.siparis.Urunler.map(urun=>
  {   if (urun.urun.ad===name)
      index=indexnum
      indexnum++
  }
    )
    console.log('index', index)
    this.state.siparis.Urunler[index].kg=value
    this.setState(this.state)
    console.log(this.state.siparis.Urunler)
  }
  handleChange(e){
    let {name,value}=e.target;
    this.state.siparis[name]=value
    this.setState(this.state)
    console.log(this.state.siparis)
  }
  yeniHandleChange(e){
    this.setState({
      kg:e.target.value
    })
  }

  azalt(urun){
    console.log('Azalt:' ,urun,' :',urun.kg)
    var index = this.state.yeniurunler.indexOf(urun);
    if (index > -1) {
      this.state.yeniurunler.splice(index, 1);
    }
    console.log(this.state.urunler)
    var fiyat =0;
    this.state.yeniurunler.map(e=> fiyat=e.kg*e.fiyat+fiyat)
    this.setState({
      ucret:fiyat
    })
    console.log('Fiyat: ',fiyat )

  }

  handleSubmit(){
    istek.post("/edit",this.state).then(ynt=>{
      console.log('Edit fonk',ynt.data)
      this.setState({
        siparis:ynt.data,
        olay:1,
        modal: false,
      })
    }).catch(err=>console.log(err))
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  yeniurunChange(e){
    let urunnesne={
      urun:e,
      kg:this.state.kg
    }
    this.state.yeniurunler.push(urunnesne)
    console.log('Listedeki tüm ürünler',this.state.yeniurunler)
    var fiyat =0;
    this.state.yeniurunler.map(e=> fiyat=e.kg*e.urun.fiyat+fiyat)
    this.setState({
      ucret:fiyat,
      kg:''
    })
    console.log('state ücret',this.state.ucret)
  }
  siparisSil(){
    istek.post('/siparissil', {
      siparis_id:this.state.siparis._id
    })
      .then(ynt=>{
        console.log(ynt);
        if(ynt.data.olay===1){
          this.setState({
            olay:1
          })
        }
      })
  }

  render() {
    return(
     <>
      <Row>
        {
          this.state.olay === 1 ? <Redirect to="/"/> :<></>
        }
      </Row>
      <Row>
        <br/>
        <br/>

        <Button style={{'marginLeft':'90%'}}  onClick={this.toggle} className="btn-warning"><i className="icon-pencil"></i></Button>
        <Modal className="duzenle-modal" isOpen={this.state.modal} toggle={this.toggle}>

          <ModalBody>
            <Row>
              <Col xs="6">
                <p className="display-4">Düzenle</p>

              </Col>
              <Col xs="6">
                <Button onClick={this.siparisSil} className="btn-pill btn-danger float-right"><i className="icon-close"> </i></Button>
              </Col>
            </Row>

            <Card color="light">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-user"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="ad" value={this.state.siparis.ad}  onChange={this.handleChange} type="text" placeholder="İsim Soyisim" autoComplete="text" />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-phone"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="telefon" value={this.state.siparis.telefon} onChange={this.handleChange} type="text" placeholder="Telefon" autoComplete="text" />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-social-instagram"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="userid" value={this.state.siparis.userid} onChange={this.handleChange} type="text" placeholder="Instagram Kullanıcı Adınız" autoComplete="text" />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-location-pin"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="adres" value={this.state.siparis.adres} onChange={this.handleChange} type="text" placeholder="Tam adres" autoComplete="text" />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-tag"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input name="detay" value={this.state.siparis.detay} onChange={this.handleChange} type="text" placeholder="Özel istek" autoComplete="text" />
              </InputGroup>
              <Row>



                  <Col  xs="12" lg="12" md="12">
                    {
                      this.state.yeniurunler.length >0 ?
                        <Card>
                          <Alert color="info">Yeni Eklenen Ürünler</Alert>
                          {
                            this.state.yeniurunler.map(e =>
                              <>
                                <Row>
                                  <Col xs="6">
                                    <span className="mb-3 float-left"><p>{e.kg} KG {e.ad}</p> </span>
                                  </Col>
                                  <Col xs="6">
                                   <Button onClick={()=>this.azalt(e)} className="btn-pill btn-danger float-right"><i className="icon-minus"> </i></Button>
                                  </Col>

                                </Row>

                              </>
                            )
                          }
                        </Card>
                        :
                        <>
                          <Alert color="danger"> Bir ürünün kilogramını yazdıktan sonra + butonuna basıp ekle. Eklemeden diğerinin kilogramını yazma. Eklediğin ürünler burada görünecek</Alert>
                        </>
                    }

                  </Col>
                  <Col xs="12" lg="12" md="12">

                  {
                        this.state.tumurunler.map(e=>
                          <>
                            <InputGroup>
                              <InputGroupText>{e.ad}</InputGroupText>
                              <Input name="kg" placeholder="Kilogram gir ve ekle" type="text" onChange={this.yeniHandleChange}/>
                              <Button className="btn-success" onClick={this.yeniurunChange.bind(this,e)} ><i className="icon-plus"> </i></Button>
                            </InputGroup>
                          </>
                        )

                    }

                  </Col>
              </Row>
            </Card>
          </ModalBody>
          <ModalFooter>
            {
              this.state.siparis.durum ===5 ?
                <>
                  <Button onClick={this.handleSubmit} className="btn-success">Yeniden Siparis Ver</Button>
                </>
                :
                <>
                  <Button onClick={this.handleSubmit} color="danger">Düzenlemeyi Kaydet</Button>
                </>
            }
            <Button color="secondary" onClick={this.toggle}>İptal Et</Button>
          </ModalFooter>
        </Modal>
      </Row>
       </>
    )
  }

}

export default Edit
