import React from 'react';

import {Row,Col} from "reactstrap";
import api from "../../istek";
import Slayt from "./Slayt";
import { Container,  Loader} from 'semantic-ui-react'
import { Placeholder } from 'rsuite';
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


  render() {

    const { Paragraph } = Placeholder;
    const YerTutucu = ()=><Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
    return(

      <div className="ana_sayfa">
        <Row>
             <Col xs="12">
               {this.props.kategoriler.length>0 ?
                 <div className="slayt_dış">
                   <Slayt gorseller={this.state.items}/>
                 </div>
               :
                 <YerTutucu/>
                 }
             </Col>
              <Col xs="12">
              <Container>
                {
                  this.props.kategoriler.length> 0 ?
                  <ReklamGoster {...this.props}/>
                :
                  <YerTutucu/>
                }
              </Container>
              </Col>
              <Col xs="12">
br
                <>

                  {
                    this.props.kategoriler.length>0 ?
                      <>
                        <h3 className="enCokAltCizgi text-center"><span>En çok satın alınan ürünler</span></h3>
                        <br/>
                      <Kaydırak
                        urunler={this.state.urunler}
                        {...this.props}/>
                        </>
                      :
                      <YerTutucu/>
                  }
                </>

              </Col>
         </Row>
      </div>
    )
  }
}
export default Main;
