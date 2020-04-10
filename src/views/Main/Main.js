import React from 'react';
import Urunler from "./Urunler";
import {Row,Col} from "reactstrap";
import api from "../../istek";
import Slayt from "./Slayt";
import { Divider, Loader, Header} from 'semantic-ui-react'

import "react-multi-carousel/lib/styles.css";
import ReklamGoster from "../Parcalar/ReklamGoster";
import Istatistik from "../Parcalar/Istatistik";
import Kaydırak from "../Parcalar/Kaydırak";

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategori:[],
      items:[],
      kategoriler:[],
      urunler:[]
    }
    console.log('ana sayfa verileri',this.props)
    console.log('ana sayfa path',window.location.pathname)
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
    console.log('ana menu---->',nextProps)
    this.setState({
      kategoriler:nextProps.kategoriler,
      kategori:nextProps.kategori,
      urunler:nextProps.urunler,

    })
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('ana state',nextState)
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return(nextProps.kategoriler.length>0)
  }

  render() {

  const Yukleyici=()=> <Loader size="big" active inline='centered' />
    return(

      <div className="ana_sayfa">
        <Row>
             <Col xs="12">
               <div className="slayt_dış"> <Slayt gorseller={this.state.items}/></div>
             </Col>
              <Col xs="12">
                <br/>
                <Istatistik/>
              </Col>
              <Col xs="12">

             <div className="soru_bolumu">
               <ReklamGoster {...this.props}/>
             </div>
              </Col>
              <Col xs="12">
              <div className="en_populer">
                <br/>
                <Header className="kategori_adi">
                  En Popüler Ürünler
                </Header>
                <br/><br/>
                <Kaydırak
                  urunler={this.state.urunler}
                  {...this.props}/>
              </div>
              </Col>
         </Row>
      </div>
    )
  }
}
export default Main;
