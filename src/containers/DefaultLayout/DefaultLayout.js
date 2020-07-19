import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import {Container} from 'reactstrap';
import '../../style.css'
import {AppFooter, AppHeader, AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer, AppBreadcrumb2 as AppBreadcrumb, AppSidebarNav2 as AppSidebarNav,} from '@coreui/react';
import admin_nav from '../../admin_nav';
import routes from '../../routes';
import istek from "../../istek";
import adminRoutes from "../../adminRoutes";
import {Drawer, Alert} from "rsuite";
import Sepet from "../../views/Pages/Sepet";
import Disk from 'o.disk'
import api from "../../istek";


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
    if(Disk.musteri === undefined || Disk.musteri === null){
      Disk.musteri = {
        ad:'',
        telefon:'',
        il:'',
        ilce:'',
        mahalle:'',
        tamAdres:''
      }
      console.log('disk müşteri',Disk.musteri)
    }else {
      console.log('müşteri',Disk.musteri)
    }
    if(Disk.sepet === undefined || Disk.sepet ===null){
      Disk.sepet =[]
    }
    else if(Disk.sepet.length >0){
      this.setState({sepet:Disk.sepet})
    }
    if(Disk.kullanıcı  === undefined){
      Disk.kullanıcı = null
    }
    console.log('layout user-->',Disk.kullanıcı)
    this.setState({
      user:Disk.kullanıcı
    })

    istek.get('/urunler').then((ynt)=>{
      const rastgele = Math.floor(Math.random() * 5) + 1;
      this.setState({
        kategoriler:ynt.data.foundUrun,
        olay:1,
        urunler:ynt.data.foundUrun[rastgele].urunler,
        kategori:ynt.data.foundUrun[rastgele].ad
      })
     this.gorselAl(ynt.data.foundUrun[rastgele]._id)
    }).catch((err)=>console.log(err));

  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    Disk.sepet=nextState.sepet
  }
  gorselAl(kategori_id){
    istek
      .get('kategori/'+kategori_id)
      .then(cvp=>{
        if(cvp.data.status===true){
          this.setState({urunler:cvp.data.urunler})
        }
      })
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
    this.gorselAl(secim._id)
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

    }
  }
  beneniÇıkart=urun=>{
    const index = this.state.begeni.findIndex(p => p._id === urun._id);
    {
      this.state.begeni.splice(index, 1);
      this.setState(this.state)
      Disk.begeni=this.state.begeni
    }
  }
  ÇıkışYap=()=>{
    this.setState({
      user:null
    })
    Disk.kullanıcı= null
    istek.get('/signout').then(ynt=>{
      console.log(ynt.data.user,ynt.data.msg)
    })
    this.props.history.push('/yonetim')
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
    Disk.kullanıcı= user
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
    this.setState({
      seciliUrun:urun,
      urunGoster:true,
      aramaGörünürlük:false
    })
    if(urun.gosel?.data===undefined){
      api
        .post('gorselver',{gorselID:urun.gorsel})
        .then(cvp=>{
          urun.gorsel=cvp.data.img
          this.setState({
            seciliUrun:urun
          })
        })
    }
  }
  sepeteEkle=(urun)=>{
    let urun_id=urun._id

    const index = this.state.sepet.findIndex(p => p._id === urun_id)
    if(index === -1)
    {
      api
        .post('gorselver',{gorselID:urun.gorsel})
        .then(cvp=>{
          urun.gorsel=cvp.data.img
        })
      urun.miktar=1;
      urun.ucret=urun.miktar*urun.fiyat
      this.setState({
        sepet:[...this.state.sepet,urun],
        toplam:urun.miktar+this.state.toplam,
      })
      Alert.success(urun.net+' '+ urun.ad+' eklendi',5000)

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
      Alert.warning(urun.ad+' çıkarıldı',5000)
    }
    this.sepetMiktar(this.state.sepet.length)

  };
  mikarDeğiştir=(girdi,urun)=>{
    let urunIndex = this.state.sepet.findIndex(p => p._id ===urun._id)
    let guncelle = this.state.sepet[urunIndex]
    guncelle.miktar+=girdi
    guncelle.ucret=guncelle.fiyat*guncelle.miktar
    if(guncelle.miktar===0)
    {
      this.urunÇıkart(urun)
    }

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
                      <button onClick={()=>this.sayfa('sorgula')} className="yan_menu_giris_butonu">
                        <span style={{paddingLeft:'4px',paddingRight:'4px',whiteSpace:'nowrap'}}>
                          Siparişlerim
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
