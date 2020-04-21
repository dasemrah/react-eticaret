import React,{Component} from 'react'
import {List,Button,Header,Segment,Container} from "semantic-ui-react";
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
            <div className="tek_urun">
              <Row>
                <Col xs="12" md="4" lg="4">
                  <img className="tek_urun_gorsel" size='tiny' src={this.state.urun.img} />
                </Col>
                <Col xs="12" md="8" lg="8">
                  <Segment color='yellow' style={{height:'100%'}}>
                    <List>
                      <List.Item><Header as='h2' textAlign='center'>{this.state.urun.ad}</Header></List.Item>
                      <List.Item><span className="p"> <br/>{this.state.urun.aciklama}</span></List.Item>
                      <br/>
                      <List.Item>
                        <div className="align-items-center text-center center">
                          <br/>
                          <span className="h4 text-center"> <br/>{this.state.urun.net}</span><br/>
                          <br/>
                          <span className="text-danger h4 text-center"> {this.state.urun.fiyat} ₺ </span><br/>
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
                  </Segment>
                </Col>

              </Row>
            </div>
          </Col>

          {this.state.tercih.length>0 ?
            <Col xs="12">
            <Container>
              <br/>
                <Header color="brown" as='h2' textAlign='center'  block dividing>
                  Birlikte tercih edilenler
                </Header>
                <Kaydırak {...this.props} urunler={this.state.tercih}/>
            </Container>
            </Col>

            :null
          }
          {this.state.benzer.length>0 ?
            <Col xs="12">
              <Container>
                <br/>
                  <Header block dividing color="pink" as='h2' textAlign='center'>
                    Benzer Ürünler
                  </Header>
                  <Kaydırak {...this.props} urunler={this.state.benzer}/>
              </Container>
            </Col>
            :null}
        </Row>
      </>
    )
  }

}

export default Urun
