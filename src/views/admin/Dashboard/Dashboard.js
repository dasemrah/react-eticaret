import React, { Component, } from 'react';
import {Link} from 'react-router-dom';
import Widget01 from "../../components/Widgets/Widget01";
import {Col, Row, Spinner} from 'reactstrap';
import api from "../../../istek";
import '../../../style.css';
import _ from 'lodash'
import KazancGrafik from "../KazancGrafik/KazancGrafik";
import Grafik from "../KilogramGrafik";
import AylikGrafik from "../AylikGrafik";
import {Segment,Icon,Button} from 'semantic-ui-react'
import {Panel} from "rsuite";

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state={
      tumurunler:[],
      tumsiparisler:[],
      satın_alım:[],
      toplamkazanç:0,
      sonbiray:[],
      ay:0,

    }

  }
componentDidMount() {
  api.get('/tumsiparisler').then((ynt)=>{
    this.setState({tumsiparisler:ynt.data.siparis})
    var kazanç=0
    var miktar=0
    this.state.tumurunler.map(e=>{
      ynt.data.siparis.map(s => {
        s.Urunler.map(u=>{
          if(e._id===u._id&&u.miktar!==null){
            miktar+=u.miktar
          }
        })
      })
      this.setState({ satın_alım: [...this.state.satın_alım, {id:e._id, urun:e, miktar:miktar} ] })
      miktar=0
    })
    this.state.satın_alım.map(e=>{
        this.setState({
          toplamkazanç:this.state.toplamkazanç+(e.miktar*e.urun.fiyat)
        })
      }
    )

  })
  api.get('/urunler').then((ynt)=>{

    ynt.data.foundUrun.map(kategori=>{
      kategori.urunler.map(urunler=>{
        this.state.tumurunler.push(urunler)
      })
    })
    this.setState(this.state)

  }).catch((err)=>console.log(err));
  api.get('/tarih/'+this.state.ay).then(gunluk=>{
    console.log('tarih:-->',gunluk)
    this.grafigedok(gunluk)
  })



}



  sonraki=(ay)=>{

    var buay=this.state.ay+ay;
    if(buay===-1){buay=0}
    this.setState({ay:buay})
    api.get('/tarih/'+buay).then(ynt=>{
      this.grafigedok(ynt);
    })
  }
  grafigedok=(gunluk)=>{

    this.state.sonbiray=[]
    var secili
    gunluk.data.map(i=>{
      var bulunan={
        aradizi:[],
        _id:'',
        tarih:''
      }
      if(secili!==i.tarih.slice(0,10)){
        bulunan.tarih=i.tarih.slice(0,10);
        bulunan._id=i._id
        _.map(gunluk.data, (o) => {
          if (o.tarih.slice(0, 10) === i.tarih.slice(0, 10)) {
            bulunan.aradizi.push(o);
          }
        })

        if(!_.find(this.state.sonbiray,{'bulunan._id':bulunan._id})){
          this.state.sonbiray.push(bulunan)
        }
      }
      secili=i.tarih.slice(0,10)
      this.setState({
        sonbiray:this.state.sonbiray,
      })
    })

  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return(nextState.tumurunler.length === nextState.satın_alım.length)
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('ürün sayısı --->',nextState.tumurunler.length)
    console.log('satın alım sayısı---->',nextState.satın_alım.length)
  }

  render() {


    return (
      <div className="app fadeIn">
        <br/>
        <Row>

          <Col xs="12" md="6" lg="3">
            <Link to="/urunler">
              <Widget01 color="blue" className="vidget" mainText="Mağazadaki Ürünler" value={this.state.tumurunler.length} smallText="Güncel Durum"
                        color="success" header={this.state.tumurunler.length}
              />
            </Link>
            <br/>
          </Col>
          <Col xs="12" md="6" lg="3">
            <Link to="/siparisler">
              <Widget01 className="vidget"
                        mainText="Toplam Siparişler"
                        value={this.state.tumsiparisler.length} smallText="Şimdiye kadar gelen tüm siparişleri içerir"
                        color="warning" header={this.state.tumsiparisler.length}
              />
            </Link>
            <br/>
          </Col>


          {this.state.tumsiparisler.length>0 ?

            <Col xs="12" md="12" lg="12">
              <Row>
                <Col xs="12">
                  <Panel shaded style={{backgroundColor:'white'}}>
                    <p className="p text-center">Kazanç Tablosu</p>
                    <p className="h2 text-muted text-center text-capitalize">Toplam Kazanç: {this.state.toplamkazanç} ₺</p>

                    <Button
                      icon
                      onClick={()=>this.sonraki(1)}
                      floated="left"
                    >
                      <Icon name="arrow alternate circle left outline"/>
                    </Button>
                    <Button
                      icon
                      onClick={()=>this.sonraki(-1)}
                      floated="right"
                    >
                      <Icon name="arrow alternate circle right outline"/>
                    </Button>
                    <br/>
                    <AylikGrafik data={this.state.sonbiray}/>

                  </Panel>
                  <br/>
                </Col>
                <Col xs="12">
                    <Grafik data={this.state.satın_alım}/>
                </Col>
                <Col xs="12">
                  <br/>
                  <KazancGrafik data={this.state.satın_alım}/>
                </Col>
              </Row>
            </Col>
            :<Spinner/>
          }
        </Row>
      </div>
    );
  }
}

export default Dashboard;
