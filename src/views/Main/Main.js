import React from 'react';
import api from "../../istek";


import {IconButton, Message, Placeholder} from 'rsuite';
import {Image, Label} from 'semantic-ui-react'
import {Icon, Drawer} from "rsuite";

import Sepet from "../Pages/Sepet";
import Magnifier from "react-magnifier";
import Kategoriler from "../Pages/Kategoriler";
import Arama from "../Parcalar/Arama";
import {Row,Col} from "reactstrap";
class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategori:[],
      items:[],
      kategoriler:[],
      urunler:[],
      etiket:'',
      ucret:0,
      sepetToggle:false,
      olay:0,
      yerlesim:'bottom',
      seciliGorsel:'',
      sepette:Boolean,
      miktar:0
    }
  }


  componentDidMount() {

    api.get('/slayt')
      .then((foundItems)=>{
        this.setState({
          items:foundItems.data
        })
      })
    var toplam=0
    this.props.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
    this.setState({ucret:toplam})
  }
  sepetAc=(yerlesim)=>{
    this.setState({
      sepetToggle:true,
      yerlesim:yerlesim
    })
  }
  etiketBul(kategori_ID){
    let index = this.props.kategoriler.findIndex(p=>p._id === kategori_ID)
    this.setState({etiket:this.state.kategoriler[index].ad})
  }

  componentWillReceiveProps(nextProps, nextContext) {
    api
      .post('gorselver',{gorselID:nextProps.seciliUrun.gorsel})
      .then(cvp=>{
        console.log('seçili değişim')
        this.setState({seciliGorsel:cvp.data.img.data})
      })
    var toplam=0
    nextProps.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
    ////
    var sepetsırası = nextProps.sepet.findIndex(p=>p._id===nextProps.seciliUrun._id);
    if(sepetsırası>-1){
      this.setState({
        sepette:true,
        miktar:nextProps.sepet[sepetsırası].miktar
      })
    }else {
     this.setState({
       sepette:false
     })
    }
    /////
    this.setState({
      kategoriler:nextProps.kategoriler,
      kategori:nextProps.kategori,
      urunler:nextProps.urunler,
      ucret:toplam,
      olay:1
    })
    if(nextProps.urunGoster){
      this.etiketBul(nextProps.seciliUrun.kategori)
    }
  }

  render() {

    const { Paragraph } = Placeholder;
    const YerTutucu = ()=><Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
    return(

      <div className="ana_sayfa">
        <Drawer
          show={this.props.urunGoster}
          onHide={()=>this.props.urunKapat()}
          placement='bottom'
          size='md'
        >
          <Drawer.Header>
            <Drawer.Title>{this.props.seciliUrun.ad}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
           <div className="tek_urun">
            <Row>
              <Col xs='12' lg='6' md='6'>
                <Magnifier src={this.state.seciliGorsel} width={500} />
              </Col>
              <Col xs='12' lg='6' md='6'>
                <div className="tek_urun_alt">
                  <div className="hJAUJy">
                    {
                      this.props.seciliUrun.indirimde ?
                        <span className="indirim">İndirimde</span>
                        :null
                    }
                    <div className="kzoayf ">
                      <h1 className="mqzOv">{this.props.seciliUrun.ad}</h1>
                      <div className="fbUCfN">
                        <div className="cqZYhV ">
                          {this.props.seciliUrun.fiyat} ₺
                        </div>
                      </div>
                    </div>
                    <div className="btDBfe">
                      {this.props.seciliUrun.net}
                    </div>
                    <p className="OLDqC">
                      {this.props.seciliUrun.aciklama}
                    </p>
                    <div className="jiwWyF ">
                      {
                        this.props.seciliUrun.aktif ?
                          <>
                            {this.state.sepette ?
                              <div className="urun_counter_katman">
                                <Icon className='urun_counter' icon='data-decrease' onClick={()=>this.props.miktarDeğiştir(-1,this.props.seciliUrun)} />
                                <span>{this.state.miktar}</span>
                                <Icon className='urun_counter' icon='plus'  onClick={()=>this.props.miktarDeğiştir(1,this.props.seciliUrun)} />
                              </div>
                            :
                              <div onClick={()=>this.props.sepeteEkle(this.props.seciliUrun)} className="EWA-dv">
                                <IconButton  icon={<Icon className="urun_buton" icon="shopping-basket" />} color="white" circle />
                                <span className="tek_urun_sepete_ekle">Sepete Ekle</span>
                              </div>
                            }

                          </>
                          :
                          <Message
                            showIcon
                            type="warning"
                            title="Tükendi"

                          />
                      }
                      <br/><br/>
                      <span>
                        <Label size='medium' color='green'>{this.state.etiket}</Label>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
           </div>
          </Drawer.Body>

        </Drawer>

        <Drawer
          size={this.props.sepet.length>0 ? 'sm':'xs'}
          show={this.state.sepetToggle}
          onHide={()=>this.setState({sepetToggle:false})}
          placement={this.state.yerlesim}
        >
          <Drawer.Header>
           <div className="sepet_title">
            <div className="sepet_title_eleman">
             <span style={{marginRight:'10px'}}> <Icon icon='shopping-basket'/></span>
              <span>{this.props.sepet.length} ürün</span>
            </div>

           </div>
          </Drawer.Header>

            <div className="sepet_kapsam">
              <div className="sepet_duzen">
                <div className="sepet_yerlesimi">
                  <>
                    <Sepet {...this.props}/>
                  </>

                </div>

              </div>

            </div>

        </Drawer>
        <button onClick={()=>this.sepetAc('right')} className="sepet_gösterici">
           <span className="sepet_bilgileri">
            <span className="sepet_göster_icon"> <Icon icon='shopping-basket'/></span>
             {this.props.sepet.length} ürün
           </span>
          <span className='sepet_goster_fiyat'>
            {this.state.ucret} ₺
          </span>
        </button>
        <button onClick={()=>this.sepetAc('bottom')} className="mobile_sepet_gösterici">
          <span style={{color:'white',marginRight:'10px'}}><Icon icon='shopping-basket' /></span>
          <span className='text-light'>{this.props.sepet.length} ürün</span>
          <span className="mobile_sepet_ucret">{this.state.ucret} ₺</span>
        </button>
        <Row>
             <Col xs="12">

              <Image className="ana_sayda_görseli" size={"huge"} src='https://svgl.s3.eu-west-3.amazonaws.com/WhatsApp+Image+2020-04-15+at+21.49.48.jpg'/>
              <div className="ana_sayfa_arama">
                <Arama {...this.props}/>
              </div>
             </Col>

              <Col xs="12">
                <Kategoriler {...this.props}/>
              </Col>
         </Row>
      </div>
    )
  }
}
export default Main;
