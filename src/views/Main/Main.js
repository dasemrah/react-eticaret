import React from 'react';
import Arama from "../Parcalar/Arama";
import {Row,Col} from "reactstrap";
import api from "../../istek";
import {IconButton, Message, Placeholder} from 'rsuite';
import "react-multi-carousel/lib/styles.css";
import {Image} from 'semantic-ui-react'
import Kategoriler from "../Pages/Kategoriler";
import {Icon, Drawer} from "rsuite";
import YerTutucu from "../Parcalar/YerTutucu";
import Magnifier from "react-magnifier";
class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategori:[],
      items:[],
      kategoriler:[],
      urunler:[],
      ucret:0,
      sepetToggle:false,
      olay:0,
      yerlesim:''
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
    this.setState({
      kategoriler:this.props.kategoriler,
      kategori:this.props.kategori,
      urunler:this.props.urunler,
      ucret:toplam,
      olay:1
    })
  }
  sepetAc=(yerlesim)=>{
    this.setState({
      sepetToggle:true,
      yerlesim:yerlesim
    })
  }


  componentWillReceiveProps(nextProps, nextContext) {
    var toplam=0
    nextProps.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
    this.setState({
      kategoriler:nextProps.kategoriler,
      kategori:nextProps.kategori,
      urunler:nextProps.urunler,
      ucret:toplam,
      olay:1
    })
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
                <Magnifier src={this.props.seciliUrun.img} width={500} />
              </Col>
              <Col xs='12' lg='6' md='6'>
                <div className="tek_urun_alt">
                  <div className="hJAUJy">
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
                          <div onClick={()=>this.props.sepeteEkle(this.props.seciliUrun)} className="EWA-dv">
                            <IconButton  icon={<Icon className="urun_buton" icon="shopping-basket" />} color="white" circle />
                            <span className="tek_urun_sepete_ekle">Sepete Ekle</span>
                          </div>
                          :
                          <Message
                            showIcon
                            type="warning"
                            title="Tükendi"

                          />
                      }
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
                  {
                    this.props.sepet.map(e=>(
                      <div className='sepet_eleman'>
                        <div className="counter">
                          <Icon className='sepet_count' icon='data-decrease' onClick={()=>this.props.miktarDeğiştir(-1,e)} />
                          <span>{e.miktar}</span>
                          <Icon className='sepet_count' icon='plus'  onClick={()=>this.props.miktarDeğiştir(1,e)} />
                        </div>
                        <Image onClick={()=>this.props.urunAç(e)} size='mini' src={e.img} className="sepet_gorsel" alt=""/>
                        <div className="sepet_detay">
                          <span className="sepet_urun_ad">
                            {e.ad}
                          </span>
                          <span className="sepet_urun_fiyat">
                            {e.fiyat} ₺
                          </span>
                          <span className="sepet_urun_adet">
                            {e.miktar} X {e.net}
                          </span>
                        </div>
                        <span className="sepet_urun_ucret">
                            {e.ucret}₺
                          </span>
                        <span className="sepet_urun_remove">
                          <Icon onClick={()=>this.props.urunÇıkart(e)} icon='close'/>
                        </span>
                      </div>
                    ))
                  }
                  </>
                  {
                    this.props.sepet.length> 0 ?
                      <div className="tamamla">
                        <button onClick={()=> this.props.history.push('/siparis')} className="tamamla_buton">
                          <a> Siparişi Tamamla</a>
                          <span className="tamamla_ucret">
                      {this.state.ucret}₺
                    </span>
                        </button>
                      </div>
                      :null
                  }
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
                {
                  this.state.olay === 0 ?
                    <YerTutucu/>
                    :
                    <>
                      <br/>
                    <Kategoriler {...this.props}/>
                </>
                    }

              </Col>
         </Row>
      </div>
    )
  }
}
export default Main;
