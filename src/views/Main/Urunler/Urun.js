import React,{Component} from 'react'
import {List,Divider,Header} from "semantic-ui-react";
import {Row,Col} from 'reactstrap'
import {Button} from 'evergreen-ui'
import Kaydırak from "../../Parcalar/Kaydırak";
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
    console.log('ürün sayfası',nextProps)
    var nesne = {
      _id:nextProps.seciliUrun._id ,
      ad: nextProps.seciliUrun.title ? nextProps.seciliUrun.title : nextProps.seciliUrun.ad,
      aciklama: nextProps.seciliUrun.description ? nextProps.seciliUrun.description : nextProps.seciliUrun.aciklama,
      img: nextProps.seciliUrun.image ? nextProps.seciliUrun.image : nextProps.seciliUrun.img,
      fiyat: nextProps.seciliUrun.price ? parseInt(nextProps.seciliUrun.price) : nextProps.seciliUrun.fiyat,
      net: nextProps.seciliUrun.net,
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
            <div className="tek_urun">
              <Row>
                <Col xs="12" md="4" lg="4">
                  <img className="tek_urun_gorsel" size='tiny' src={this.state.urun.img} />
                </Col>
                <Col xs="12" md="8" lg="8">
                  <List>
                    <List.Item><Header as='h2' textAlign='center'>{this.state.urun.ad}</Header></List.Item>
                    <List.Item><span className="p"> <br/>{this.state.urun.aciklama}</span></List.Item>
                    <List.Item><Header as='h4' textAlign='right' color='green' className="p"> <br/>{this.state.urun.fiyat} ₺</Header></List.Item>
                    <br/>
                    <List.Item>
                      <Button
                        intent='danger'
                        iconAfter='shopping-cart'
                        size={24}
                        marginLeft={'35%'}
                        onClick={()=>this.props.sepeteEkle(this.state.urun)}
                      >
                        Sepete Ekle
                      </Button>
                    </List.Item>

                  </List>
                </Col>

              </Row>
            </div>
          </Col>

          {this.state.tercih.length>0 ?
            <Col xs="12">
          <div className="tercih">
            <Header as='h2' textAlign='center'>
              Birlikte tercih edilenler
            </Header>
            <Kaydırak {...this.props} urunler={this.state.tercih}/>
          </div>
            </Col>

            :null
          }
          {this.state.benzer.length>0 ?
            <Col xs="12">
           <div className="benzer">
             <Header as='h2' textAlign='center'>
               Benzer Ürünler
             </Header>
             <Kaydırak {...this.props} urunler={this.state.benzer}/>
           </div>
            </Col>
            :null}
        </Row>
      </>
    )
  }

}

export default Urun
