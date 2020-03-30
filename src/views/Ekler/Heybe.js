import React,{useEffect,useState} from "react";
import {Jumbotron,Container,Col,Row} from 'reactstrap'
import Urunler from "../Main/Urunler";
class Heybe extends React.Component{
  constructor(props){
    super(props)
  }
  componentWillReceiveProps(nextProps, nextContext) {
    console.log('heybe',nextProps)
  }

  render() {
    return(
      <Jumbotron className="text-center">
        <span className="h3 text-dark">Şifa Dolu Heybe</span>
        <br/>
        <span className="h6 text-success">Nazlı Köy'den sizin için seçtiğimiz şifa dolu ürünlerimiz...</span>
        <br/><br/>
        <Container>
          <Row>
            {this.props.urunler.map(urun=>
              <Col xs="6" lg="3" md="4">
                <Urunler
                  urun={urun}
                  {...this.props}
                />
              </Col>
            )
            }
          </Row>
        </Container>
      </Jumbotron>
    )
  }
}
export default Heybe
