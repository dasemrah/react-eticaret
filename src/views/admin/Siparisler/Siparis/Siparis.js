import React from 'react';
import {toaster} from "evergreen-ui";
import {Menu,Icon,Dimmer,Loader} from "semantic-ui-react";
import {Alert,Row,Col} from 'reactstrap';
import SiparisKart from "./SiparisKart";
import istek from '../../../../istek';
import '../../../../style.css'
var seviye;
var tumUrunler=[];

istek.get('/urunler').then(ynt=>{
  tumUrunler=ynt.data.urunler;
}).catch(err=>console.log(err))






const aramaSonucu =(sonuc)=>(
  <>
    {
      sonuc !==null ?
        <>
          <Alert color="success">Arama Sonucu</Alert>
          <SiparisKart
            siparis={sonuc}
            seviye={seviye}
            tumUrunler={tumUrunler}
          />
        </>
        :
        <>
          <Alert color="warning">Sonuç Bulunamadı</Alert>
        </>
    }
  </>
)
class Siparis extends React.Component{
  constructor(props){
    super(props)
    this.state={
      siparisler:[],
      yeni:[],
      ödendi:[],
      hazırlanıyor:[],
      hazır:[],
      verilecek:[],
      kargo:[],
      teslim:[],
      yedek:[],
      ara:'',
      aramasonucu:[],
      activeTab: new Array(1).fill('1'),
      activeItem:'0',
      animasyon:true
    }
    istek.get('/tumsiparisler').then((ynt)=>{
      console.log('tüm siprarişler',ynt.data.siparis)
      this.setState({
        siparisler:ynt.data.siparis,
      })
      ynt.data.siparis.map(sip=>
        sip.durum=== 0 ?
          this.state.yeni.push(sip)
          :sip.durum===  1 ?
          this.state.ödendi.push(sip)
          :sip.durum === 2 ?
            this.state.hazırlanıyor.push(sip)
            :sip.durum===  3?
              this.state.hazır.push(sip)
              :sip.durum === 4 ?
                this.state.verilecek.push(sip)
                :sip.durum===  5 ?
                  this.state.kargo.push(sip)
                  :sip.durum === 6 ?
                    this.state.teslim.push(sip)
                    :null
      )
      this.setState({
        animasyon:false
      })

    }).catch((err)=>console.log(err));
  }

  handleChange(e){
    this.setState({
      ara:e.target.value
    })
    if(this.state.ara.length >3){
      istek.post('/siparisara',{
        isim:this.state.ara
      })
        .then(res=>{
          if(res.data.olay === 1){
            this.setState({
              aramasonucu:res.data.ynt
            })
          }else {
            this.setState({
              aramasonucu:null
            })
          }

        })
        .catch(err=>console.log(err))
    }
  }



  handleItemClick = (e, { name }) => {this.setState({ activeItem: name })}

  render() {

    const { activeItem } = this.state;
    const Göster=()=>(
      <>
        {
          this.state.activeItem === '0' ?
            this.state.yeni.map(siparis=>(
              <SiparisKart key={siparis._id} siparis={siparis}  seviye={seviye} tumUrunler={tumUrunler}/>
            ))
            :
            this.state.activeItem === '1' ?
              this.state.ödendi.map(siparis=>(
                <SiparisKart key={siparis._id} siparis={siparis}  seviye={seviye} tumUrunler={tumUrunler}/>
              ))
              :
              this.state.activeItem === '2' ?
                this.state.hazırlanıyor.map(siparis=>(
                  <SiparisKart key={siparis._id} siparis={siparis}  seviye={seviye} tumUrunler={tumUrunler}/>
                ))
                :
                this.state.activeItem === '3' ?
                  this.state.hazır.map(siparis=>(
                    <SiparisKart key={siparis._id} siparis={siparis}  seviye={seviye} tumUrunler={tumUrunler}/>
                  ))
                  :
                  this.state.activeItem === '4' ?
                    this.state.verilecek.map(siparis=>(
                      <SiparisKart key={siparis._id} siparis={siparis}  seviye={seviye} tumUrunler={tumUrunler}/>
                    ))
                    :
                    this.state.activeItem === '5' ?
                      this.state.kargo.map(siparis=>(
                        <SiparisKart key={siparis._id} siparis={siparis}  seviye={seviye} tumUrunler={tumUrunler}/>
                      ))
                      :
                      this.state.activeItem === '6' ?
                        this.state.teslim.map(siparis=>(
                          <SiparisKart key={siparis._id} siparis={siparis}  seviye={seviye} tumUrunler={tumUrunler}/>
                        ))
                        :null
        }
      </>
    )
    seviye=(e)=>{
      this.setState({animasyon:true})
      istek.get('/seviye/'+e).then(ynt=>{

        this.setState({
          siparisler:ynt.data,
          yeni:[],
          ödendi:[],
          kargo:[],
          hazır:[],
          teslim:[],
          yedek:[],
          verilecek:[],
          hazırlanıyor:[],
        })
        ynt.data.map(sip=>
          sip.durum=== 0 ?
            this.state.yeni.push(sip)
            :sip.durum===  1 ?
            this.state.ödendi.push(sip)
            :sip.durum === 2 ?
              this.state.hazırlanıyor.push(sip)
              :sip.durum===  3?
                this.state.hazır.push(sip)
                :sip.durum === 4 ?
                  this.state.verilecek.push(sip)
                  :sip.durum===  5 ?
                    this.state.kargo.push(sip)
                    :sip.durum === 6 ?
                      this.state.teslim.push(sip)
                      :null
        )
        this.setState({animasyon:false})
      })
      toaster.success(
        'Taşındı',
        {
          duration:3600,
        }

      )
    }
    return(
      <Row>
        <Dimmer active={this.state.animasyon}>
          <Loader />
        </Dimmer>
        <Col xs="12" lg="12" md="12">
          <Menu fixed icon size="tiny" pointing secondary borderless>
            <Menu.Item name='0' active={activeItem === '0'} onClick={this.handleItemClick}>
              <Icon size="large" color="red" name="fire"/>{this.state.yeni.length}
            </Menu.Item>

            <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick}>
              <Icon size="large" color="teal" name="lira"/>{this.state.ödendi.length}
            </Menu.Item>

            <Menu.Item name='2' active={activeItem === '2'} onClick={this.handleItemClick}>
              <Icon size="large" color="olive" loading name="spinner"/>{this.state.hazırlanıyor.length}
            </Menu.Item>

            <Menu.Item name='3' active={activeItem === '3'} onClick={this.handleItemClick}>
              <Icon size="large" color="green" name="check circle outline"/>{this.state.hazır.length}
            </Menu.Item>

            <Menu.Item  name='4' active={activeItem === '4'} onClick={this.handleItemClick}>
              <Icon size="large" loading color="pink" name="circle time"/>{this.state.verilecek.length}
            </Menu.Item>

            <Menu.Item name='5' active={activeItem === '5'} onClick={this.handleItemClick}>
              <Icon size="large" color="blue" name="shipping"/>{this.state.kargo.length}
            </Menu.Item>

            <Menu.Item name='6' active={activeItem === '6'} onClick={this.handleItemClick}>
              <Icon size="large" color="brown" name="home"/>{this.state.teslim.length}
            </Menu.Item>

          </Menu>
          <br/><br/>
        </Col>

        <Col xs="12">
          <Row>

            <Göster/>
          </Row>
        </Col>
      </Row>
    )
  }

}
export default Siparis;
