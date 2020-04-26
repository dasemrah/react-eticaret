import React from 'react';
import Arama from "../Parcalar/Arama";
import {Row,Col} from "reactstrap";
import api from "../../istek";
import { Placeholder } from 'rsuite';
import "react-multi-carousel/lib/styles.css";
import {Image} from 'semantic-ui-react'
import Kategoriler from "../Pages/Kategoriler";
import {Icon, Drawer} from "rsuite";

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
      ucret:toplam
    })
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('ana state',nextState)
  }

  render() {

    const { Paragraph } = Placeholder;
    const YerTutucu = ()=><Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
    return(

      <div className="ana_sayfa">
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
                        <Image size='mini' src={e.img} className="sepet_gorsel" alt=""/>
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
                <br/><br/><br/>
                <Kategoriler {...this.props}/>
              </Col>
         </Row>
      </div>
    )
  }
}
export default Main;
