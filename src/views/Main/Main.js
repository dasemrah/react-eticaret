import React from 'react';
import Urunler from "./Urunler";
import {Row,Col} from "reactstrap";
import api from "../../istek";
import Slayt from "./Slayt";
import { Container, Segment,  Loader, Header} from 'semantic-ui-react'

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
              <Container>
                <ReklamGoster {...this.props}/>
              </Container>
              </Col>
              <Col xs="12">
                <br/>
                <br/>
                <>
                  <h3 className="enCokAltCizgi text-center"><span>En çok satın alınan ürünler</span></h3>
                  <Kaydırak
                    urunler={this.state.urunler}
                    {...this.props}/>
                </>

              </Col>
         </Row>
      </div>
    )
  }
}
export default Main;
