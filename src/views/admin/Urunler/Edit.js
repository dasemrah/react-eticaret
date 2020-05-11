import React from 'react';
import istek from '../../../istek'
import axios from "axios";

import { Button} from "evergreen-ui";
import {Input,TextArea, Image} from "semantic-ui-react";
import ImageUploader from "react-images-upload";
import { Modal, Toggle, Divider, Icon, Panel} from 'rsuite';


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
      gorsel    : '',
      success   :false,
      indirimde : Boolean,
      imgData:Buffer
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const {urun} = nextProps
    this.setState({
      ad       : urun.ad,
      aciklama : urun.aciklama,
      net      : urun.net,
      fiyat    : urun.fiyat,
      gorsel   : urun.gorsel,
      imgData  : urun.gorsel ? urun.gorsel.data : null
    })
    this.gorselver(urun.gorsel)
    console.log('ürün değişti',nextProps)
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }
  gorselver = (gorselID)=>{
    istek
      .post('gorselver',{gorselID:gorselID})
      .then(ynt=>{
        console.log('görsel alındı',ynt.data.img)
        this.setState({
          gorsel:ynt.data.img,
          imgData:ynt.data.img.data
        })
      })
  }
  gorselSec=(picture)=>{
    let {name, type} = picture[0]
    let imageData=Buffer
    console.log('dosya bilgileri',name,'---->',type)
    let okuyucu=new FileReader()
    okuyucu.readAsDataURL(picture[0])
    okuyucu.onload=()=>{
      istek
        .post('yukle',{
          name,
          type,
          data:okuyucu.result
        })
        .then(ynt=>{
          console.log('kayıtlı veri-->',ynt.data.img._id)

          this.setState({
            imgData : ynt.data.img.data,
            gorsel  : ynt.data.img
          })
        })
        .catch(err=>console.log(err))
    }
    okuyucu.onerror=err=>console.log(err)

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

            <Image src={this.state.imgData} size='tiny' style={{width:'40%', marginLeft:'30%'}} bordered/>
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
            <Divider/>
            <Panel header='Ürün Ayarları'>
              <span>Stok durumu <Toggle checked={urun.aktif} onChange={e=>this.props.stok(e)} checkedChildren={<Icon icon="check" />} unCheckedChildren={<Icon icon="close" />} /></span>
              <br/><br/>
              <span>İndirimde  <Toggle checked={urun.indirimde} onChange={e=>this.props.indirim(e)} checkedChildren={<Icon icon="check" />} unCheckedChildren={<Icon icon="close" />} /></span>

            </Panel>
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
