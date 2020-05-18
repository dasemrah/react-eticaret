import React,{Component} from 'react';
import axios from 'axios';
import istek from '../../../istek';


import {CardHeader,CardBody,Toast,ToastHeader,ToastBody, Card, InputGroup, InputGroupAddon,Button} from 'reactstrap';
import {Drawer, Panel, Input ,Message, Alert, Dropdown} from "rsuite";
import ImageUploader from 'react-images-upload';
import {Image} from "semantic-ui-react";
import {Pane} from "evergreen-ui";

class Urunekle extends Component{
  constructor(props){
    super(props)

    this.state={
      ad:'',
      aciklama:'',
      fiyat:'',
      net:  '',
      gorsel:'',
      imgData:'',
      status : false,
      olay:0,
      kategoriler:[],
      kategori:'',
      kategorid:'',
      yenikategori:'',
      loading:0,
      modal:false,
      yeni_urun:'',
    };
  }
  componentDidMount() {
    istek.get('/kategoriler').then(ynt=>{
      console.log('tüm kategoriler:------>',ynt.data)
      this.setState({kategoriler:ynt.data})
    })
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('state',this.state)
  }

  setModal=()=>{
    this.setState({
      modal:!this.state.modal,
      yenikategori:''
    });
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

  urunuKaydet = () => {
    istek
      .post('/urunekle',this.state)
      .then(ynt=>{
        console.log('ürün eklendi dönen yanıt:>>>>>>>>>',ynt.data)
        this.setState({yeni_urun:ynt.data.urun, status:ynt.data.status})
        console.log(ynt)})
      .catch(err=>console.log(err))
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
   const {ad, net, fiyat, aciklama, kategori, imgData} = this.state
   const Başarılı = () => (
      <>
        <Panel header='Yeni ürün eklendi'>
                <p><i className="icon-bag"></i>{this.state.yeni_urun.ad}</p>
                <p><i className="icon-tag"></i>{this.state.yeni_urun.aciklama}</p>
                <p><i className="icon-credit-card"></i>{this.state.yeni_urun.fiyat}</p>
                <img src={this.state.imgData} style={{widht:'55px'}} className="img-thumbnail" alt=""/>
        </Panel>

      </>
   )
  const KategoriSecici =()=>(
    <div className="kategori_secici">
      <Dropdown placement='topStart' title={this.state.kategori.length>0 ? this.state.kategori : 'Kategori seç'}>
        {
          this.state.kategoriler.map(e=>(
            <Dropdown.Item  onSelect={()=>this.kategorisec(e._id,e.ad)}>{e.ad}</Dropdown.Item>
          ))
        }
      </Dropdown>
    </div>
  )
   const GörselYükleyici = () =>(
    <Panel title={'Ürün görseli'} style={{backgroundColor:'white'}}>
      <ImageUploader
        withIcon={true}
        buttonText={this.state.imgData.length > 0 ? 'Değiştir' : 'Görsel Seç'}
        onChange={this.gorselSec}
        imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
        label="Görsel boyutu en falza 150kb olmalı"
        withPreview={true}
        maxFileSize={250000}
        withLabel={true}
        fileSizeError="Görsel Boyutu Çok Büyük"
        singleImage={true}
      />
      <Image src={this.state.imgData} size='small' style={{width:'100%'}}/>
    </Panel>
   )

   const YeniKategoriEkletici = () => (
     <Drawer size='xs' show={this.state.modal}
             onHide={()=>this.setModal()} className="modal-warning">
       <Drawer.Header>
         <Drawer.Title>
           Yeni Kategori Ekle
         </Drawer.Title>
       </Drawer.Header>
       <Drawer.Body>
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
   )
    return(


        <div>
            {
              this.state.status === true ?
               <Başarılı/>
                :
                <>
                  <YeniKategoriEkletici/>

                  <Panel className="urun_ekle_katman" header='Yeni ürün ekle'>
                    <GörselYükleyici/>
                    <br/>
                    <br/>
                    <Panel className="urun_bilgisi" style={{backgroundColor:'white'}} title={'Ürün bilgisi'}>
                      <Input
                        name="ad"
                        value={this.state.ad}
                        onChange={e=>this.setState({ad:e})}
                        type="text"
                        placeholder="Ürün Adı"
                        width={300}
                      />
                      <Input
                        name="net"
                        value={this.state.net}
                        onChange={e=>this.setState({net:e})}
                        type="text"
                        placeholder="Paket miktarı"
                      />
                      <Input
                        name="aciklama"
                        value={this.state.aciklama}
                        onChange={e=>this.setState({aciklama:e})}
                        type="text"
                        placeholder="Ürünün detaylı açıklaması"
                        componentClass="textarea"
                        rows={3}
                        style={{ width: '100%', resize: 'auto' }}
                      />
                      <Input
                        name="fiyat"
                        value={this.state.fiyat}
                        onChange={e=>this.setState({fiyat:e})}
                        type="number"
                        placeholder="Ürün fiyatı"
                      />
                    </Panel>
                    <br/>
                    <KategoriSecici/>
                    <br/>
                  </Panel>
                  {
                    ad.length > 0 && net.length > 0 && fiyat.length > 0 && aciklama.length > 0 && kategori.length > 0 && imgData.length > 0 ?
                      <div className="urun_ekle_alt">
                        <button onClick={()=>this.urunuKaydet()} className="urun_olustur_butonu">
                          Ürünü Oluştur
                        </button>
                      </div>
                      : null
                  }
                  </>
            }
        </div>
    )};


};
export default Urunekle
