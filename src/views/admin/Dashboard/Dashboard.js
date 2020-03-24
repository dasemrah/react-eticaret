import React, { Component, } from 'react';
import {Link} from 'react-router-dom';
import Widget01 from "../../components/Widgets/Widget01";
import Widget04 from "../../components/Widgets/Widget04";
import {Col, Row, Jumbotron, Spinner,Button,ButtonGroup} from 'reactstrap';
import api from "../../../istek";
import '../../../style.css';
import _ from 'lodash'
import Charts from "../../components/Charts";
import KazancGrafik from "../KazancGrafik/KazancGrafik";
import Grafik from "../KilogramGrafik";
import AylikGrafik from "../AylikGrafik";
let tumsatınalım=[]
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
  api.get('/tarih/'+this.state.ay).then(gunluk=>{
    console.log('tarih:-->',gunluk)
    this.grafigedok(gunluk)
  })
  api.get('/urunler').then((ynt)=>{
    console.log('Tüm ürünler: ',ynt.data);
    ynt.data.foundUrun.map(kategori=>{
      kategori.urunler.map(urunler=>{
        this.state.tumurunler.push(urunler)
      })
    })
    this.setState(this.state)

  }).catch((err)=>console.log(err));
  api.get('/tumsiparisler').then((ynt)=>{
    this.setState({tumsiparisler:ynt.data.siparis})
    var kazanç=0
    var miktar=0
    this.state.tumurunler.map(e=>{
      console.log('statedeki ürünler--->',e)
     ynt.data.siparis.map(s => {
      console.log('dönen her sipariş--->',s)
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
      console.log('satın alım:',e)
      this.setState({
        toplamkazanç:this.state.toplamkazanç+(e.miktar*e.urun.fiyat)
      })
      }
    )

  })
}
   shouldComponentUpdate(nextProps, nextState, nextContext) {
    return(nextState.tumurunler.length===nextState.satın_alım.length)
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
            console.log('her gün--->',o)
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
  render() {


    return (
      <div className="app fadeIn">
        <br/>
        <Row>

        <Col xs="12" md="6" lg="3">
          <Link to="/urunler">
            <Widget01 className="vidget" mainText="Mağazadaki Ürünler" value={this.state.tumurunler.length} smallText="Güncel Durum"
                      color="success" header={this.state.tumurunler.length}
            />
          </Link>
        </Col>
          <Col xs="12" md="6" lg="3">
            <Link to="/siparisler">
              <Widget01 className="vidget"
                        mainText="Toplam Siparişler"
                        value={this.state.tumsiparisler.length} smallText="Şimdiye kadar gelen tüm siparişleri içerir"
                        color="warning" header={this.state.tumsiparisler.length}
              />
            </Link>

          </Col>



          <Col xs="12" md="12" lg="12">
          <Jumbotron className="kac-defa-satilmis">
            <p className="display-4 text-center">Kazanç Tablosu</p>
            <p className="h2 text-muted text-center text-capitalize">Toplam Kazanç: {this.state.toplamkazanç} ₺</p>
            {this.state.tumsiparisler.length>0 ?
              <Row>
                <Col xs="12">
                  <Row>
                      <Col xs="12">
                            <Button  color="success" onClick={()=>this.sonraki(1)} className="btn-primary float-left"> <i className="icon-arrow-left-circle"> </i></Button>
                            <Button color="success" onClick={()=>this.sonraki(-1)} className="btn-primary float-right"> <i className="icon-arrow-right-circle"> </i></Button>

                      </Col>
                    <Col xs="12">
                      <AylikGrafik data={this.state.sonbiray}/>
                    </Col>
                  </Row>
                </Col>
                <Col lg="12">
                  <Grafik
                    data={this.state.satın_alım}
                  />
                </Col>
                <Col xs="12">
                  <KazancGrafik
                    data={this.state.satın_alım}
                  />
                </Col>
              </Row>
              :
              <Spinner style={{ width: '24rem', height: '24rem' }} type="grow" color="info" />
            }
          </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
