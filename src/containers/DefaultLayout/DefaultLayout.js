import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Spinner} from 'reactstrap';
import {List, Divider,Header,Button,Label,Icon} from 'semantic-ui-react'
import '../../style.css'
import {AppFooter, AppHeader, AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer, AppBreadcrumb2 as AppBreadcrumb, AppSidebarNav2 as AppSidebarNav,} from '@coreui/react';
import admin_nav from '../../admin_nav';
import routes from '../../routes';
import istek from "../../istek";
import adminRoutes from "../../adminRoutes";
import {Pill, SideSheet, toaster} from "evergreen-ui";
import Sepet from "../../views/Pages/Sepet";
import Disk from 'o.disk'

const data = require('../../data')
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const AdminFooter   = React.lazy(()=>import('../AdminLayout/AdminFooter'))
const AdminHeader   = React.lazy(()=>import('../AdminLayout/AdminHeader'))
class DefaultLayout extends Component {
  constructor(props){
    super(props)
    this.state={
      user:null,
      sepetMiktar:0,
      salla:false,
      kategoriler:[],
      kategori:'',
      sepet:[],
      populer:[],
      toplam:0,
      sepetSeçke:false,
      ucret:0,
      ekran:"Alış Veriş",
      tercih:[],
      benzer:[],
      seciliUrun:[],
      sonuc:[],
      urunler:[],
      yanMenu:false,
      urunGoster:false,
      begeni:[]

    }
  }


  componentDidMount() {
   if(Disk.begeni!==null){
     Disk.begeni.map(e=>{
       this.state.begeni.push(e)
     })
   }
    this.setState({
      user:Disk.kullanıcı
    })
    istek.get('/urunler').then((ynt)=>{
      this.setState({
        kategoriler:ynt.data.foundUrun,
        olay:1,
        urunler:ynt.data.foundUrun[4].urunler,
        kategori:ynt.data.foundUrun[4].ad
      })
    }).catch((err)=>console.log(err));
    istek.get('/populer').then(ynt=>{
      console.log('popüler',ynt.data)
    })
  }



  yanMenuAcKapa=()=>{
    this.setState({
      yanMenu:!this.state.yanMenu
    })
  }
  kategoriSec=secim=>{
    console.log('seçim',secim)
    this.setState({
      kategori:secim.ad,
      urunler:secim.urunler,
      yanMenu:false
    })
    console.log('kategori seçildi',this.state.kategori)
    this.props.history.push('/kategori')
  }

  giris=()=>{
    this.setState({
      yanMenu:false
    })
    this.props.history.push('/login')
  }
  begen=(urun)=>{
    let index=this.state.begeni.findIndex(p=>p._id===urun._id)
    if(index===-1)
    {
      this.state.begeni.push(urun)
      this.setState(this.state)
      Disk.begeni=this.state.begeni
      console.log('begenilere eklendi-->',this.state.begeni)
      toaster.success('Beğenilere Eklendi',{duration:1.5})
    }
    else
      {
        console.log('zaten var')
        toaster.danger(
          'Urun beğeniler bölümünde'
        )
      }
  }
  beneniÇıkart=urun=>{
    const index = this.state.begeni.findIndex(p => p._id === urun._id);
    {
      this.state.begeni.splice(index, 1);
      this.setState(this.state)
      Disk.begeni=this.state.begeni
      toaster.warning(
        'Ürün beğenilerden çıkarıldı',
        {duration:1}
      )
    }
  }
  ÇıkışYap=()=>{
    Disk.kullanıcı=null
    this.setState({
      user:null
    })
    istek.get('/signout').then(ynt=>{
      console.log(ynt.data.user,ynt.data.msg)
    })
    this.props.history.push('/login')
  }
  sorgula=()=>{
    this.setState({
      yanMenu:false
    })
    this.props.history.push('/sorgula')
  }
  login=user=>{
    this.setState({
      user:user
    })
    Disk.kullanıcı=user
    console.log(user.username,' giriş yaptı')
  }
  sepetMiktar=(veri)=>{
    this.setState({sepetMiktar:veri})
  }
  seçkeAçKapa=()=>{
    this.setState({
      sepetSeçke:!this.state.sepetSeçke,
      salla:!this.state.salla
    })
  }
  seçkeKapa=()=>{
    this.setState({
      yanMenu:false
    })
  }
  aramaSonucu=(result)=>{
    this.setState({
      seciliUrun:result
    })
  }
  sepetiBosalt=()=>{
    this.setState({
      sepet:[]
    })
    console.log('sepet boşandı',this.state.sepet)
  }
  urunKapat=()=>{
    this.setState({
      urunGoster:false,
    })
  }
  urunAç=(urun)=>{
    let {kategori} = urun
    istek
      .post('/benzer', {kategori,urun})
      .then(ynt => {
        let {benzer,tercih} = ynt.data
        this.setState({
           benzer:benzer,
           tercih:tercih,
           seciliUrun:urun,
        })
      })
    this.props.history.push('/urun')
  }
  sepeteEkle=(urun)=>{
    console.log(typeof urun)
    urun.miktar=1;
    console.log( urun)
    this.setState({
      sepetSeçke:true
    })
    let urun_id=urun._id
    const index= this.state.sepet.findIndex(p => p._id === urun_id)
    if(index === -1)
    {
      this.setState({
        sepet:[...this.state.sepet,urun],
        toplam:urun.miktar+this.state.toplam,
        urunGoster:false,
      })
      toaster.success('1 adet '+urun.net+' '+ urun.ad+' eklendi',{duration:1.7})
    }
    else
      {
      this.mikarDeğiştir(+1,this.state.sepet.indexOf(urun),urun)
      }
    this.seçkeAçKapa()
  }

  ucret=()=> {
    var toplam=0
    this.state.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
    this.setState({ucret:toplam})
  }

  urunÇıkart = urun => {
    let urun_id=urun._id
    const index = this.state.sepet.findIndex(p => p._id === urun_id);
    if (index >= 0)
    {
      this.state.sepet.splice(index, 1);
      this.setState(this.state)
      this.toplamHesapla()
      toaster.warning(urun.ad+' çıkarıldı')
    }
    this.sepetMiktar(this.state.sepet.length)

  };
  mikarDeğiştir=(girdi,urunIndex,urun)=>{
    this.state.sepet[urunIndex].miktar+=girdi;
    if(this.state.sepet[urunIndex].miktar===0)
    {
      this.urunÇıkart(urun)
    }
    this.setState(this.state);
    this.toplamHesapla();

  }
  toplamHesapla=()=>{
    var aratoplam=0
    this.state.sepet.map(urunler=> {
      aratoplam+=parseInt(urunler.miktar)
    })
    this.setState({toplam:aratoplam})
  }

   loading = () => <></>
  render() {
    return (
       <>
        {
          this.state.user!==null ?
            <div className="app dashboard">
              <AppHeader fixed>
                <Suspense >
                  <AdminHeader ÇıkışYap={this.ÇıkışYap}/>
                </Suspense>
              </AppHeader>
              <div className="app-body">
                <AppSidebar fixed display="xs">
                  <AppSidebarHeader />
                  <AppSidebarForm />
                  <Suspense>
                    <AppSidebarNav navConfig={admin_nav} {...this.props} router={router}/>
                  </Suspense>
                  <AppSidebarFooter />
                  <AppSidebarMinimizer />
                </AppSidebar>
                <main className="main">
                  <AppBreadcrumb appRoutes={adminRoutes} router={router}/>
                  <Container fluid>
                    <Suspense fallbacK={this.loading()}>
                      <Switch>
                        {adminRoutes.map((route, idx) => {
                          return route.component ? (
                            <Route
                              key={idx}
                              path={route.path}
                              exact={route.exact}
                              name={route.name}
                              render={props => (
                                <route.component {...props} />
                              )} />
                          ) : (null);
                        })}
                        <Redirect to="/"/>
                      </Switch>
                    </Suspense>
                  </Container>
                </main>

              </div>
              <AppFooter>
                <Suspense >
                  <AdminFooter />
                </Suspense>
              </AppFooter>
            </div>


            :



            <div className="app appBackground">
              <AppHeader fixed>
                <Suspense  >
                  <DefaultHeader urunAç={this.urunAç}  {...this.state} aramaSonucu={this.urunAç} {...this.props} seçkeKapa={this.seçkeKapa} yanMenuAcKapa={this.yanMenuAcKapa}  sepet={this.state.sepet} salla={this.state.salla} sepetAçKapa={this.seçkeAçKapa} />
                </Suspense>
              </AppHeader>
              <div className="app-body">
                <SideSheet
                  position={'left'}
                  isShown={this.state.yanMenu}
                  onCloseComplete={()=>this.seçkeKapa()}
                  width={300}

                >

                 <div className="yan_menu">
                   <br/><br/><br/>
                   <Icon name='close' color='red' onClick={this.yanMenuAcKapa} className="float-right"/>

                   <List animated className="kategori_listesi" selection verticalAlign='middle'>
                     {
                       this.state.kategoriler.map(kat=>
                         <List.Item selection={true}  key={kat._id} onClick={()=>this.kategoriSec(kat)}>
                          <Header as='a' dividing>
                            <span className="text-dark text-capitalize p text-left floated">{kat.ad}</span>
                            <br/>
                          </Header>

                         </List.Item>
                       )
                     }
                   </List>


                 </div>
                  <div className="yan_menu_giris">
                    <Button.Group size='mini'>
                      <Button onClick={this.sorgula}>Sipariş Sorgula</Button>
                      <Button.Or text=" "/>
                      <Button positive onClick={this.giris}>Sisteme Giriş</Button>
                    </Button.Group>
                  </div>
                </SideSheet>

                <main className="main">
                  <AppBreadcrumb appRoutes={routes} router={router}/>
                  <>
                    <SideSheet
                      position={'right'}
                      isShown={this.state.sepetSeçke}
                      containerProps={{
                        display: 'flex',
                        flex: '1',
                        flexDirection: 'column',
                      }}
                      width={400}
                      preventBodyScrolling
                      onCloseComplete={() => this.setState({sepetSeçke:false})}
                    >

                   <>
                     <br/><br/>
                     <Sepet
                       seçkeAçKapa={this.seçkeAçKapa}
                       sepet={this.state.sepet}
                       miktarDeğiştir={this.mikarDeğiştir}
                       toplam={this.state.toplam}
                       ucret={this.state.ucret}
                       urunÇıkart={this.urunÇıkart}
                       devam={this.siparisDevam}
                       {...this.props}


                     />
                   </>
                    </SideSheet>
                    <Suspense fallback={this.loading()}>
                      <Switch>



                        {

                          routes.map((route, idx) => {
                            return route.component ? (
                              <Route
                                key={idx}
                                path={route.path}
                                user={this.state.user}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                  <route.component
                                    seçke={this.state.sepetSeçke}
                                    miktarDegis={this.sepetMiktar}
                                    açKapa={this.seçkeAçKapa}
                                    sepeteEkle={this.sepeteEkle}
                                    urunAç={this.urunAç}
                                    {...props}
                                    {...this.state}
                                    sepet={this.state.sepet}
                                    ekran={this.state.ekran}
                                    urunKapat={this.urunKapat}
                                    sepetiBosalt={this.sepetiBosalt}
                                    kategoriSec={this.kategoriSec}
                                    login={this.login}
                                    begen={this.begen}
                                    beneniÇıkart={this.beneniÇıkart}
                                  />
                                )} />
                            ) : (null);

                          })}
                        <Redirect to="/" />
                      </Switch>
                    </Suspense>
                  </>
                </main>

              </div>
              <AppFooter>
                <Suspense >
                  <DefaultFooter {...this.props} />
                </Suspense>
              </AppFooter>
            </div>
        }
    </>


    );
  }
}

export default DefaultLayout;
