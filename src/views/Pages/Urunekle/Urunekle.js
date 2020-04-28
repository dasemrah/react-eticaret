import React,{Component} from 'react';
import {Row, Col,CardHeader,CardBody,Toast,ToastHeader,ToastBody, Card, Input, InputGroup, InputGroupText, InputGroupAddon,Button} from 'reactstrap';
import istek from '../../../istek';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import {Alert,Popover,Menu} from "evergreen-ui";
import {Label} from "semantic-ui-react";
import {Drawer} from "rsuite";


class Urunekle extends Component{
  constructor(props){
    super(props)

    this.state={
      ad:'',
      aciklama:'',
      fiyat:'',
      net:  '',
      pictures:[],
      success : false,
      url : "",
      file_url:'',
      olay:0,
      kategoriler:[],
      kategori:'',
      kategorid:'',
      yenikategori:'',
      loading:0,
      modal:false,
      yeni_urun:'',
      resim:''
    };
    this.handleChange=this.handleChange.bind(this);


  }
  componentDidMount() {
    istek.get('/kategoriler').then(ynt=>{
      console.log('tüm kategoriler:------>',ynt.data)
      this.setState({kategoriler:ynt.data})
    })
  }

  handleChange(e){
    let {name,value}=e.target;
    this.setState({
      [name]:value
    })
    console.log(this.state)
  }
  setModal=()=>{
    this.setState({
      modal:!this.state.modal,
      yenikategori:''
    });
  }


  gorselSec=(picture)=>{
    this.state.pictures.push(picture[0]);
    this.setState({
      url:"",
      success:false
    })
  }
  handleUpload = (ev) => {
    this.setState({
      loading:1
    })
    console.log('Resimler:---->',this.state.pictures);
    let file = this.state.pictures[0];

    // Split the filename to get the name and type
    let fileName = file.name;
    let fileType = file.type;
    console.log("Preparing the upload");

    istek.post('/sign',{
      fileName : fileName,
      fileType : fileType
    })
      .then(response => {
        var returnData = response.data.data.returnData;
        console.log('return data: ',response.data)
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({url: url})
        console.log("Recieved a signed request " + signedRequest);

        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'Content-Type': fileType
          }
        };
        axios.put(signedRequest,file,options)
          .then(result => {
            console.log("Response from s3")
            console.log(result)

            let fileUrl=result.config.url.slice(0,result.config.url.indexOf('?'))
            console.log('Dosya adresi: ',fileUrl);
            this.setState({
              success: true,
              file_url:fileUrl
            });

            istek.post('/urunekle',this.state)
              .then(ynt=>{
                console.log('ürün eklendi dönen yanıt:>>>>>>>>>',ynt.data)
                  this.setState({
                    yeni_urun:ynt.data
                  })
                console.log(ynt)
              })
              .catch(err=>console.log(err))


          })

          .catch(error => {
            console.log(error)
          })




      })
      .catch(error => {
        console.log(error)
      })




  }

  kategorisec=(id,kategori)=>{
    this.setState({
      kategori:kategori,
      kategorid:id
    })
  }
  kategoriEkle=()=>{
    istek.post('/yenikategori',{ad:this.state.yenikategori}).then(ynt=>{
      console.log(ynt.data)
      this.state.kategoriler.push(ynt.data)
      this.setState({
        yenikategori:''
      })
      this.setModal();
    })
  }
  kategoriChange=(event)=>{
    console.log(event.target.value);
    this.setState({
      yenikategori:event.target.value
    })
  }
 render() {
   const SuccessMessage = () => (
      <>
        <Card>
          <CardHeader>
           <Alert className="text-dark text-capitalize h3 alert-info">Yeni Ürün Oluşturuldu</Alert>
          </CardHeader>
          <CardBody>
            <Toast>
              <ToastHeader>
                <span><i className="icon-bag"></i>{this.state.yeni_urun.ad}</span>
              </ToastHeader>
              <ToastBody>
                <p><i className="icon-tag"></i>{this.state.yeni_urun.aciklama}</p>
                <p><i className="icon-credit-card"></i>{this.state.yeni_urun.fiyat}</p>
                <img src={this.state.yeni_urun.img} style={{widht:'55px'}} className="img-thumbnail" alt=""/>
              </ToastBody>
            </Toast>
          </CardBody>
        </Card>

      </>
   )

    return(
      <>
        <Drawer size='xs' show={this.state.modal}
               onHide={()=>this.setModal()} className="modal-warning">
          <Drawer.Header>
            <Drawer.Title>
              Yeni Kategori Ekle
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <Alert
              intent="none"
              title="Kategori adını yazıp ekleyiniz"
              marginBottom={32}
            />
              <InputGroup>
                <InputGroupAddon addonType="append" >
                  Kategori Adı
                </InputGroupAddon>
                <Input value={this.state.yenikategori} placeholder="ad gir" type="text" onChange={this.kategoriChange}/>
              </InputGroup>
          </Drawer.Body>
          <Drawer.Footer>
            {this.state.yenikategori.length>0 ?
              <Button color="primary" onClick={()=>this.kategoriEkle()}><i className="icon-plus">Kategoriyi Kaydet</i></Button>
            :null}
            <Button color="danger" onClick={()=>this.setModal()}>İptal</Button>
          </Drawer.Footer>
        </Drawer>
        <>
          <Row>
            {
              this.state.success ?
               <SuccessMessage/>
                :
                <Col xs="12">

                  <Card>
                    <ToastHeader>
                      <h1>Ürün Ekle</h1>
                    </ToastHeader>
                    <ToastBody>
                      <Alert
                        intent="none"
                        title="Ürün bilgilerini girip yan taraftan kategori seçimi yapınız"
                        marginBottom={32}
                      />
                      <InputGroup>
                        <Popover
                          content={
                            <Menu>
                              <Menu.Group>
                                {this.state.kategoriler.map(kategori=>
                                  <Menu.Item onSelect={()=>this.kategorisec(kategori._id,kategori.ad)}>{kategori.ad}
                                    <Label circular key={kategori._id}>
                                      {kategori.urunler.length}
                                    </Label>
                                  </Menu.Item>
                                )}
                              </Menu.Group>
                              <Menu.Divider />
                              <Menu.Group>
                                <Menu.Item icon="plus" intent="warning" onSelect={this.setModal}>
                                  Kategori Ekle...
                                </Menu.Item>
                              </Menu.Group>
                            </Menu>
                          }
                        >
                          <Button>{this.state.kategori.length>0 ? <span>{this.state.kategori}</span>:  <span>Kategori Seç</span>}</Button>
                        </Popover>
                      </InputGroup>
                      <br/>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="ad" value={this.state.ad} onChange={this.handleChange} type="text" placeholder="Ürün Adı" autoComplete="text" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-info"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="net" value={this.state.net} onChange={this.handleChange} type="text" placeholder="Ürün miktarı gram" autoComplete="text" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-tag"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="aciklama" value={this.state.aciklama} onChange={this.handleChange} type="text" placeholder="Ürün Bilgisi" autoComplete="text" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-credit-card"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="fiyat" value={this.state.fiyat} onChange={this.handleChange} type="number" placeholder="Fiyat" autoComplete="text" />
                      </InputGroup>
                      <ImageUploader
                        withIcon={true}
                        buttonText='Görsel Seç'
                        onChange={this.gorselSec}
                        imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
                        label="Maksimum görsel boytu 5 megabayt."
                        withPreview={true}
                        maxFileSize={5242880}
                        withLabel={true}
                        fileSizeError="Görsel Boyutu Çok Büyük"
                        singleImage={true}
                      />



                      {this.state.file_url.length>0 ?
                        <img style={{maxWidht:'55px'}} src={this.state.url} alt=""/>
                      :null}

                    </ToastBody>
                    <br/>
                    {this.state.kategori.length>0 ?
                      <Button color="warning" onClick={this.handleUpload}>
                        {this.state.loading ===0 ?  <>Gönder <i className="icon-rocket"></i></>
                          :<p>Yükleniyor...</p>
                        }
                      </Button>
                      :null
                    }
                  </Card>

                </Col>

            }

          </Row>
        </>

      </>

    )};


};
export default Urunekle
