import React from 'react';
import istek from '../../../../istek';
import Edit from '../Edit'
import '../../../../style.css'
import {
  Card,
  CardText,
  CardHeader,
  CardBody,
  Alert,
  Col,Jumbotron,
  Badge,
  Row,
  Nav,Button,
  NavItem,InputGroup,InputGroupText,Input,
  NavLink,
  TabPane, TabContent
} from 'reactstrap';

import '../../../../style.css'
var seviye;
var tumUrunler=[];

istek.get('/urunler').then(ynt=>{
  ynt.data.foundUrun.map(urun=>tumUrunler.push(urun))
}).catch(err=>console.log(err))

const urunView =(e)=>(
  <div key={e._id}>
    <Col   lg="12" xs="12" md="12">
      <h4>{e.miktar} KG {e.ad}</h4>
    </Col>
  </div>
)


const siparisCard=(siparis)=>(

    <>
      <Col xs="12" sm="6" lg="4">
        <Jumbotron className="siparis-card">
            <Row>
              {siparis.durum !==5 ?
                <Button onClick={(e)=>seviye(siparis._id)} className="btn-warning seviye-butonu"><i className="icon-arrow-right-circle"> {seviyeBul(siparis)}</i></Button>:
                <></>
              }
            </Row>
            <Row>
              <Col lg="12" xs="12" md="12">
                <br/>
                <Row>

                  <Col lg="6" xs="6" md="6" ><Button className="btn-success"> <h6><a className="text-white" target="_blank" href={"https://api.whatsapp.com/send?phone="+siparis.telefon}> <i className="fa fa-whatsapp fa-2x"></i>  {siparis.telefon}</a></h6></Button> </Col>
                </Row>

              </Col>
              <Col lg="12" xs="12" md="12">
                        <br/>
                         <h3 className="siparis-card-text"> <i className="icon-user"> {siparis.ad} </i></h3>
                         <h3 className="siparis-card-text"><i className="icon-location-pin"> {siparis.adres}</i> </h3>
                         <h3 className="siparis-card-text"> <i className="icon-clock"> Tarih: {siparis.tarih.slice(0,siparis.tarih.length-14)} </i></h3>
                         {siparis.durum ===0 ? <h3 className="siparis-card-text"><i className="icon-credit-card"> Ücret: {siparis.ucret} ₺ </i>  </h3>: <></>}

              </Col>
              <Col lg="12" xs="12" md="12">

                <Card>
                  <CardHeader>Ürünler</CardHeader>
                  <CardBody>
                    <Row key={siparis._id}>
                      {
                        siparis.Urunler !==null ?
                        siparis.Urunler.map(urun=>
                          urunView(urun)
                        )
                          :
                          <>
                          </>
                      }
                    </Row>
                  </CardBody>

                </Card>
              </Col>
              <Col  lg="12" xs="12" md="12">
                <Edit
                  tumUrunler={tumUrunler}
                  siparis={siparis}
                />
              </Col>
            </Row>
        </Jumbotron>
        <br/><br/>
      </Col>
    </>
)

const seviyeBul=(siparis)=>(
  siparis.durum === 0 ? <span>Ödendilere At</span> :
  siparis.durum === 1 ? <span>Hazırlandı</span> :
  siparis.durum === 2 ? <span>Kargoya Verildi</span>:
  siparis.durum === 3 ? <span>Teslim Edildi</span>:
  siparis.durum === 4 ? <span>Yedeğe At</span>:
    <></>

)
const aramaSonucu =(sonuc)=>(
  <>
    {
      sonuc !==null ?
        <>
          <Alert color="success">Arama Sonucu</Alert>
        {siparisCard(sonuc)}
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
      odendi:[],
      kargo:[],
      hazirlandi:[],
      teslim:[],
      yedek:[],
      ara:'',
      aramasonucu:[],
      activeTab: new Array(1).fill('1'),
    }

    this.handleChange=this.handleChange.bind(this)
    this.toggle = this.toggle.bind(this);
    istek.get('/tumsiparisler').then((ynt)=>{
     this.setState({
       siparisler:ynt.data.siparis,

     })
      ynt.data.siparis.map(sip=>
       sip.durum===0 ?
         this.state.yeni.push(sip)
         :sip.durum===1 ?
         this.state.odendi.push(sip)
         :sip.durum === 2 ?
           this.state.hazirlandi.push(sip)
           :sip.durum === 3 ?
             this.state.kargo.push(sip)
           :sip.durum === 4 ?
             this.state.teslim.push(sip)
             :sip.durum === 5 ?
               this.state.yedek.push(sip)
             :console.log()
      )
      this.setState(this.state)

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


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    return (
      <>
        {
          this.state.activeTab[0] ==='1' ?
            <TabPane tabId="1">
              <Row>

                {
                  this.state.siparisler.map(siparis=>
                    siparis.durum===0 ?
                      siparisCard(siparis)
                      :
                      <>
                      </>
                  )}
              </Row>
            </TabPane>
            :this.state.activeTab[0] ==='2' ?
            <TabPane tabId="2">
              <Row>


                {
                  this.state.siparisler.map(siparis=>
                    siparis.durum===1 ?
                      siparisCard(siparis)
                      :
                      <>
                      </>
                  )
                }
              </Row>
            </TabPane>
            :this.state.activeTab[0] ==='3' ?
              <TabPane tabId="3">
                <Row>


                  {
                    this.state.siparisler.map(siparis=>
                      siparis.durum===2 ?
                        siparisCard(siparis)
                        :
                        <>
                        </>
                    )
                  }
                </Row>
              </TabPane>
              :this.state.activeTab[0] ==='4' ?
                <TabPane tabId="4">
                  <Row>


                    {
                      this.state.siparisler.map(siparis=>
                        siparis.durum===3 ?
                          siparisCard(siparis)
                          :
                          <>
                          </>
                      )
                    }
                  </Row>
                </TabPane>
                :this.state.activeTab[0] ==='5' ?
                  <TabPane tabId="5">
                    <Row>


                      {
                        this.state.siparisler.map(siparis=>
                          siparis.durum===4 ?
                            siparisCard(siparis)
                            :
                            <>
                            </>
                        )
                      }
                    </Row>
                  </TabPane>
                  :this.state.activeTab[0] ==='6' ?
                    <TabPane tabId="6">
                        {
                          this.state.siparisler.map(siparis=>
                            siparis.durum===5 ?
                              siparisCard(siparis)
                              :
                              <>
                              </>
                          )
                        }
                    </TabPane>
                    :null
        }
      </>
    );
  }
  render() {
   seviye=(e)=>{

     istek.get('/seviye/'+e).then(ynt=>{

       this.setState({
         siparisler:ynt.data,
         yeni:[],
         odendi:[],
         kargo:[],
         hazirlandi:[],
         teslim:[],
         yedek:[],
       })
       ynt.data.map(sip=>
         sip.durum===0 ?
           this.state.yeni.push(sip)
           :sip.durum===1 ?
           this.state.odendi.push(sip)
           :sip.durum === 2 ?
             this.state.hazirlandi.push(sip)
             :sip.durum === 3 ?
               this.state.kargo.push(sip)
             :sip.durum === 4 ?
               this.state.teslim.push(sip)
               :sip.durum ===5 ?
               this.state.yedek.push(sip)
                 :console.log()
       )
       this.setState(this.state)
     })

   }
   const yeniBoyut=()=>{
     var boyut;
     boyut=this.state.siparisler.find({durum:0})
     return boyut
   }
    return(
      <div className="animated fadeIn">

            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  <span className={this.state.activeTab[0] === '1' ? '' : 'd-none'}></span>
                  <Badge color="danger"><h5>{this.state.yeni.length} <i className="icon-fire"></i></h5></Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  <span className={this.state.activeTab[0] === '2' ? '' : 'd-none'}> </span>
                  <Badge pill color="warning"><h5>{this.state.odendi.length} <i className="icon-credit-card"> </i></h5> </Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }} >
                  <span className={this.state.activeTab[0] === '3' ? '' : 'd-none'}> </span>
                  <Badge pill color="success"><h5>{this.state.hazirlandi.length} <i className=" fa fa-check-circle"> </i></h5></Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '4'}
                  onClick={() => { this.toggle(0, '4'); }} >
                  <span className={this.state.activeTab[0] === '4' ? '' : 'd-none'}> </span>
                  <Badge pill color="success"><h5>{this.state.kargo.length} <i className="icon-rocket"> </i></h5></Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '5'}
                  onClick={() => { this.toggle(0, '5'); }} >
                  <span className={this.state.activeTab[0] === '5' ? '' : 'd-none'}> </span>
                  <Badge pill color="info"><h5>{this.state.teslim.length} <i className="icon-home"></i></h5></Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '6'}
                  onClick={() => { this.toggle(0, '6'); }} >
                  <span className={this.state.activeTab[0] === '6' ? '' : 'd-none'}> </span>
                  <Badge pill color="dark"><h5>{this.state.yedek.length} <i className="icon-tag"></i></h5></Badge>
                </NavLink>
              </NavItem>
            </Nav>
        <Row>
          <Col xs="12" lg="12" md="12">
            <Card color="info">
            <CardHeader>
              <h4 className="text-light text-center">Sipariş Ara</h4>
            </CardHeader>
            <CardBody>
              <InputGroup>
                <InputGroupText><i className="icon-user text-danger"></i></InputGroupText>
                <Input onChange={this.handleChange} type="text" name="ara" value={this.state.ara} placeholder="Aranacak İsmi Gir"/>
              </InputGroup>
              {this.state.aramasonucu.length >0 ? <Alert color="danger"><h6>{this.state.aramasonucu.length} sonuç bulundu</h6></Alert> :<></>}

            </CardBody>
             </Card>
          </Col>
          {
            this.state.aramasonucu.length>0 ?
              <Jumbotron>
               <Row>
                 {
                   this.state.aramasonucu.map(e=>
                     <Col xs="12" lg="12" md="12">

                       {aramaSonucu(e)}

                     </Col>
                   )
                 }
               </Row>
              </Jumbotron>
              :null
          }
        </Row>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
      </div>
    )
  }

}
export default Siparis;
