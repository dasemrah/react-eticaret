import React from 'react';
import Arama from "../Parcalar/Arama";
import {Row,Col} from "reactstrap";
import api from "../../istek";
import { Placeholder } from 'rsuite';
import "react-multi-carousel/lib/styles.css";
import {Image} from 'semantic-ui-react'
import Kategoriler from "../Pages/Kategoriler";

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
