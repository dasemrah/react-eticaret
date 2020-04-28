import React from 'react';
import {CornerDialog, Button} from "evergreen-ui";
import {Input,TextArea, Image} from "semantic-ui-react";
import istek from '../../../istek'
import {toaster} from "evergreen-ui";
import ImageUploader from "react-images-upload";
import { Modal } from 'rsuite';
import axios from "axios";

class Edit extends React.Component{
  constructor(props){
    super(props)
    this.state={
      ad        :'',
      aciklama  :'',
      fiyat     :0,
      net       :'',
      pictures  :[],
      url       : '',
      file_url  : '',
      success   :false
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const {urun} = nextProps
    this.setState({
      ad       : urun.ad,
      aciklama : urun.aciklama,
      net      : urun.net,
      fiyat    : urun.fiyat,
      file_url : urun.img
    })
    console.log('ürün değişti',nextProps)
  }
  stok=(urunid,durum)=>{
    istek
      .post('/stok',{urunid:urunid,durum:durum})
      .then(ynt=>{
        console.log('ynt',ynt)
        toaster.success(durum ? 'Ürün markete eklendi' : 'Ürün stoktan kaldırıldı')
        this.props.gizle()
      })
      .catch(err=>console.log(err))
  }
  gorselSec=(picture)=>{
    this.state.pictures.push(picture[0]);
    this.setState({
      url:"",
      success:true
    })
    this.handleUpload()
  }

  handleUpload = (ev) => {
    this.setState({
      loading:1
    })
    console.log('Resimler:---->',this.state.pictures);
    let file = this.state.pictures[0];

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
      })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })




  }



  render() {
    const {ad,aciklama,net,fiyat,success}=this.state;
    const {urun} = this.props
    return(
      <div>
        <Modal show={this.props.gorunme} onHide={()=>this.props.gizle()}>
          <Modal.Header>
            <Modal.Title>Düzenle</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Image src={this.state.file_url} size='tiny' style={{width:'40%', marginLeft:'30%'}} bordered/>
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

            <Input
              fluid
              placeholder={urun.ad}
              value={ad}
              onChange={e=>this.setState({ad:e.target.value})}
            />
            <br/>
            <TextArea
              placeholder={urun.aciklama}
              value={aciklama}
              onChange={e=>this.setState({aciklama:e.target.value})}
              style={{ minHeight: 100,width:'100%' }}
            />
            <br/>
            <Input
              fluid
              placeholder={urun.fiyat}
              value={fiyat}
              onChange={e=>this.setState({fiyat:e.target.value})}
            />
            <br/>
            <Input
              fluid
              placeholder={urun.net}
              value={net}
              onChange={e=>this.setState({net:e.target.value})}
            />
            <br/>
            <Button onClick={()=>this.stok(urun._id,urun.aktif ? false : true)} intent={urun.aktif ? 'warning' : ' '} iconAfter={urun.aktif ? 'cross' : 'add'} size={16} >
              {
                urun.aktif ===true ?
                  <span>Satıştan Kaldır</span>
                  :
                  <span>Mağazaya Ekle</span>
              }
            </Button>


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.props.duzenle(this.state)} intent='success' iconAfter='tick-circle'>Kaydet</Button>
            <Button onClick={()=>this.props.gizle()} intent='danger'>
              İptal
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    )
  }


}
export default Edit
