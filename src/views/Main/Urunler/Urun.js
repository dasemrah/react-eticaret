import React,{Component} from 'react'
import {List,Button,Header,Segment,Container,Image} from "semantic-ui-react";
import {Row,Col} from 'reactstrap'
import Kaydırak from "../../Parcalar/Kaydırak";
import Disk from "o.disk/index";
class Urun extends Component{
  constructor(props){
    super(props)
    this.state={
      urun:[],
      benzer:[],
      tercih:[],
      beğenilmiş:false,
      sepetteymiş:false
    }

  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('ürün sayfası',nextProps)
  if ( nextProps.seciliUrun.length === 0 ) {
      this.props.history.push('/')
  }
    var index=nextProps.begeni.findIndex(p=>p._id===nextProps.seciliUrun._id);
    if(index>-1){
      this.setState({
        beğenilmiş:true
      })
    }
    var sepetsırası = nextProps.sepet.findIndex(p=>p._id===nextProps.seciliUrun._id);
    if(sepetsırası>-1){
      this.setState({
        sepetteymiş:true
      })
    }
    this.setState({
      urun:nextProps.seciliUrun,
      benzer:nextProps.benzer.urunler,
      tercih:nextProps.tercih
    })

  }
  render() {
    return(
      <>
        <Row>
          <Col xs="12">




            <Segment className="tek_urun">
              <Row>
                <Col xs="12" md='6' lg='6'>
                  <Image style={{width: '100%',height: '250px'}} size='medium' src={this.state.urun.img} />
                </Col>
                <Col xs="12" md='6' lg='6' >
                  <>
                    <List>
                      <List.Item><Header as='h2' textAlign='center'>{this.state.urun.ad}</Header></List.Item>
                      <List.Item><span className="p"> <br/>{this.state.urun.aciklama}</span></List.Item>
                      <br/>
                      <List.Item>
                      <div className="align-items-center text-center center">
                        <span className="text-uppercase"> {this.state.urun.net} {this.state.urun.fiyat} ₺</span>
                      </div>
                      </List.Item>
                      <List.Item>
                        <div className="align-items-center text-center center">
                          <br/>
                          <Button.Group >
                            <Button active={!this.state.beğenilmiş} onClick={()=>this.props.begen(this.state.urun)}>
                              {!this.state.beğenilmiş ? <span>Beğen</span> : <span>Beğendin</span>}
                            </Button>
                            <Button.Or text=' ' />
                            <Button color={!this.state.sepetteymiş ? 'green' : 'black'}   onClick={()=>this.props.sepeteEkle(this.state.urun)} >{!this.state.sepetteymiş ? <span>Sepete Ekle</span>: <span>Sepette</span>}</Button>
                          </Button.Group>
                        </div>
                      </List.Item>

                    </List>
                  </>
                </Col>

              </Row>
            </Segment>
          </Col>

          {this.state.tercih.length>0 ?
            <Col xs="12">

              <br/>
                <Header color="brown" as='h2' textAlign='center'  block dividing>
                  Birlikte tercih edilenler
                </Header>
                <Kaydırak {...this.props} urunler={this.state.tercih}/>

            </Col>

            :null
          }
          {this.state.benzer.length>0 ?
            <Col xs="12">
                <br/>
                  <Header  dividing color="black" as='h2' textAlign='center'>
                    Benzer Ürünler
                  </Header>
                  <Kaydırak {...this.props} urunler={this.state.benzer}/>
            </Col>
            :null}
        </Row>
      </>
    )
  }

}

export default Urun
