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
      ay:1,

    }
    api.get('/uruntum').then((ynt)=>{
      console.log('tüm  ürünler aşlındı',ynt.data)
      ynt.data.map(e=>{
        this.setState({
          tumurunler:[...this.state.tumurunler,e]
        })
      })
    }).catch((err)=>console.log(err));
    api.get('/tarih/'+this.state.ay).then(gunluk=>{
      console.log('tarih:-->',gunluk)
      this.grafigedok(gunluk)
    })
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

  }
componentDidMount() {




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


  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('ürün sayısı --->',nextState.tumurunler.length)
    console.log('satın alım sayısı---->',nextState.satın_alım.length)
  }

  render() {


    return (
      <div className="app fadeIn">
        <br/>
        <Row>
          <Col xs='12' md='6' lg='3'>
            <Widget01 color="white" className="vidget" mainText="Mağaza Toplam Kazancı" value={this.state.toplamkazanç} smallText='Simdiye kadar satılan tüm ürünlerden gelen kazancı gösterir.'
                      color="danger" header={this.state.toplamkazanç +' ₺'}/>
            <br/>
          </Col>
          <Col xs="6" md="6" lg="3">
            <Link to="/urunler">
              <Widget01 color="blue" className="vidget" mainText="Mağazadaki Ürünler" value={this.state.tumurunler.length} smallText="Güncel Durum"
                        color="success" header={this.state.tumurunler.length}
              />
            </Link>
            <br/>
          </Col>
          <Col xs="6" md="6" lg="3">
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
                <Col xs="12" lg='12'>
                   <Panel header="Günlük Satış Grafiği">
                     <AylikGrafik sonraki={this.sonraki}  data={this.state.sonbiray}/>
                   </Panel>
                </Col>
                <Col xs="12" lg='12'>
                    <Grafik data={this.state.satın_alım}/>
                </Col>
                <Col xs="12" lg='12'>
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
