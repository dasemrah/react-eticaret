import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container,} from 'reactstrap';
import {List,Header,Button,Icon} from 'semantic-ui-react'
import '../../style.css'
import {AppFooter, AppHeader, AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer, AppBreadcrumb2 as AppBreadcrumb, AppSidebarNav2 as AppSidebarNav,} from '@coreui/react';
import admin_nav from '../../admin_nav';
import routes from '../../routes';
import istek from "../../istek";
import adminRoutes from "../../adminRoutes";
import {SideSheet, toaster} from "evergreen-ui";
import {Drawer} from "rsuite";
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
      begeni:[],
      listeAktif:'',
      aramaGörünürlük:false,
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

  }

  aramaAçKapa=()=>{
    this.setState({
      aramaGörünürlük:!this.state.aramaGörünürlük
    })
  }

  yanMenuAcKapa=()=>{
    this.setState({
      yanMenu:!this.state.yanMenu
    })
  }
  kategoriSec=secim=>{

    this.setState({
      kategori:secim.ad,
      urunler:secim.urunler,
      yanMenu:false
    })
  }
  sayfa=(e)=>{
    this.setState({
      listeAktif:e,
      yanMenu:false
    })
    this.props.history.push(e)
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
      seciliUrun:result,
      urunGoster:true,
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
            urunGoster:true,
          aramaGörünürlük:false
        })
      })
  }
  sepeteEkle=(urun)=>{
    console.log(typeof urun)

    console.log( urun)
    let urun_id=urun._id
    const index= this.state.sepet.findIndex(p => p._id === urun_id)
    if(index === -1)
    {
      urun.miktar=1;
      urun.ucret=urun.miktar*urun.fiyat
      this.setState({
        sepet:[...this.state.sepet,urun],
        toplam:urun.miktar+this.state.toplam,
        urunGoster:false,
      })
      toaster.success(urun.net+' '+ urun.ad+' eklendi',{duration:2.7})
    }
    else
      {
      this.mikarDeğiştir(1,urun)
      }
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
  mikarDeğiştir=(girdi,urun)=>{
    let urunIndex = this.state.sepet.indexOf(urun)
    let guncelle = this.state.sepet[urunIndex]
    guncelle.miktar+=girdi
    guncelle.ucret=guncelle.fiyat*guncelle.miktar
    if(guncelle.miktar===0)
    {
      this.urunÇıkart(urun)
    }
    this.setState({
      urunGoster:false
    });
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
                                <route.component
                                  {...this.props}
                                  {...props}
                                />
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
                  <DefaultHeader  aramaAçKapa={this.aramaAçKapa} {...this.state} aramaSonucu={this.urunAç} {...this.props}  yanMenuAcKapa={this.yanMenuAcKapa} />
                </Suspense>
              </AppHeader>
              <div className="app-body">
                <Drawer
                  placement='left'
                  size='xs'
                  show={this.state.yanMenu}
                  onHide={()=>this.seçkeKapa()}
                  className="yan_menu"
                >
                  <Drawer.Header  className="yan_menu_baslik">
                    <Drawer.Title className="yan_menu_baslik_ic">
                      <button onClick={()=>this.sayfa('login')} className="yan_menu_giris_butonu">
                        <span style={{paddingLeft:'4px',paddingRight:'4px',whiteSpace:'nowrap'}}>
                          Giriş Yap
                        </span>
                      </button>
                    </Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body className='yan_menu_liste'>
                    <div className="eleman">
                      <a onClick={()=>this.sayfa('/')} className={'link '+(this.state.listeAktif===this.props.history.location ? 'aktif': null)}>
                        <span>
                          Ana Sayfa
                        </span>
                      </a>
                    </div>
                    <div className="eleman">
                      <a  className={'link '+(this.state.listeAktif===this.props.history.location ? 'aktif': null)} onClick={()=>this.sayfa('sorgula')}>
                        <span>Siparişlerim</span>
                      </a>
                    </div>
                    <div className="eleman">
                      <a  className={'link '+(this.state.listeAktif===this.props.history.location ? 'aktif': null)} onClick={()=>this.sayfa('paketleme')}>
                        <span>Nasıl Paketleme Yapıyoruz?</span>
                      </a>
                    </div>
                    <div className="eleman">
                      <a  className={'link '+(this.state.listeAktif===this.props.history.location ? 'aktif': null)} onClick={()=>this.sayfa('gizlilik')}>
                        <span>Kullanım Şartları ve Gizlilik İlkesi</span>
                      </a>
                    </div>
                  </Drawer.Body>

                </Drawer>




                <main className="main">
                  <AppBreadcrumb appRoutes={routes} router={router}/>
                  <>
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
                                    aramaSonucu={this.urunAç}
                                    aramaAçKapa={this.aramaAçKapa}
                                    seçkeAçKapa={this.seçkeAçKapa}
                                    miktarDeğiştir={this.mikarDeğiştir}
                                    urunÇıkart={this.urunÇıkart}

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
