import React,{Component} from 'react'
import {Button, Item, ItemExtra,Label,Card,Divider,Image,Header} from "semantic-ui-react";
import {Row,Col} from 'reactstrap'
import Urunler from "./Urunler";
class Urun extends Component{
  constructor(props){
    super(props)
    this.state={
      urun:[],
      benzer:[],
      tercih:[]
    }

  }
  componentDidMount() {


  }
  componentWillReceiveProps(nextProps, nextContext) {
    var nesne = {
      ad: nextProps.seciliUrun.title ? nextProps.seciliUrun.title : nextProps.seciliUrun.ad,
      aciklama: nextProps.seciliUrun.description ? nextProps.seciliUrun.description : nextProps.seciliUrun.aciklama,
      img: nextProps.seciliUrun.image ? nextProps.seciliUrun.image : nextProps.seciliUrun.img,
      fiyat: nextProps.seciliUrun.price ? parseInt(nextProps.seciliUrun.price) : nextProps.seciliUrun.fiyat
    }
    this.setState({
      urun:nesne,
      benzer:nextProps.benzer.urunler,
      tercih:nextProps.tercih
    })
  }

  componentWillUpdate(nextProps, nextState, nextContext) {

    console.log('props-->',nextProps)
    console.log('state--->',nextState)
  }

  render() {
    return(
      <>
        <Row>
          <Col xs="12">
            <Item.Group>
              <Item>
                <Item.Image size='tiny' src={this.state.urun.img} />
                <Item.Content>
                  <Item.Header as='a'>{this.state.urun.ad}</Item.Header>
                  <Item.Description>
                    {this.state.urun.aciklama}
                  </Item.Description>
                </Item.Content>
                <ItemExtra>
                  <Button size='mini' content='Sepete Ekle' icon='shopping bag' labelPosition='right'
                          onClick={()=>console.log(this.props.sepeteEkle(this.state.urun))}/>
                </ItemExtra>
              </Item>
            </Item.Group>
          </Col>

          {this.state.tercih.length>0 ?
            <Col xs="12">
              <Divider/>
              <br/>

              <Header color="olive" dividing >
                Birlikte tercih edilenler
              </Header>
              <br/>
              <br/>
              <Row>
                {
                  this.state.tercih.map(e=>
                    <Col key={e._id}  xs="6" lg="3" md="4">
                     <Urunler urun={e} {...this.props}/>
                    </Col>
                  )
                }
              </Row>
            </Col>

          :null
          }
          {this.state.benzer.length>0 ?
            <Col xs="12">
              <Divider/>
              <br/><br/>
              <Header color="teal" dividing >
                Benzer Ürünler
              </Header>
              <br/>
              <br/>
              <Row>
                {
                  this.state.benzer.map(e=>
                    <Col key={e._id} xs="6" lg="3" md="4">
                      <Urunler urun={e} {...this.props}/>
                    </Col>
                  )
                }
              </Row>
            </Col>
          :null}
        </Row>
      </>
    )
  }

}

export default Urun
