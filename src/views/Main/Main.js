import React from 'react';
import Arama from "../Parcalar/Arama";
import {Row,Col} from "reactstrap";
import api from "../../istek";
import { Placeholder } from 'rsuite';
import "react-multi-carousel/lib/styles.css";
import {Image} from 'semantic-ui-react'
import Kategoriler from "../Pages/Kategoriler";
import {Icon} from "rsuite";

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategori:[],
      items:[],
      kategoriler:[],
      urunler:[],
      ucret:0
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
        <button onClick={()=>this.props.seçkeAçKapa()} className="sepet_gösterici">
           <span className="sepet_bilgileri">
            <span className="sepet_göster_icon"> <Icon icon='shopping-basket'/></span>
             {this.props.sepet.length} ürün
           </span>
          <span className='sepet_goster_fiyat'>
            {this.state.ucret} ₺
          </span>
        </button>
        <button onClick={()=>this.props.seçkeAçKapa()} className="mobile_sepet_gösterici">
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
