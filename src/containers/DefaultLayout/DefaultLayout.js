import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import {Button, Container, Spinner} from 'reactstrap';
import {List, Placeholder,Label,Header} from 'semantic-ui-react'
import '../../style.css'
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import admin_nav from '../../admin_nav';
import Arama from "../../views/Parcalar/Arama";
import UrunMenu from "../../views/Parcalar/UrunMenu";
// adminRoutes config
import routes from '../../routes';
import istek from "../../istek";
import adminRoutes from "../../adminRoutes";
import {Pill, SideSheet, toaster,Icon} from "evergreen-ui";
import Sepet from "../../views/Pages/Sepet";

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
      toplam:0,
      sepetSeçke:false,
      ucret:0,
      ekran:"Alış Veriş",
      tercih:[],
      benzer:[],
      seciliUrun:[],
      sonuc:[],
      urunler:[],
      yanMenu:false

    }
    console.log('Layout user bilgisi',data.user)
    console.log('layout-->',this.props)
    data.props=this.props
  }


  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('sepet üst',nextState)
  }
  componentDidMount() {
    istek.get('/urunler').then((ynt)=>{
      console.log(ynt.data)
      this.setState({
        kategoriler:ynt.data.foundUrun,
        olay:1,
        urunler:ynt.data.foundUrun[1].urunler,
        kategori:ynt.data.foundUrun[1].ad
      })
    }).catch((err)=>console.log(err));
  }
  yanMenuAcKapa=()=>{
    this.setState({
      yanMenu:!this.state.yanMenu
    })
  }
  kategoriSec=(secim)=>{
    this.setState({
      kategori:secim.ad,
      urunler:secim.urunler,
      yanMenu:false
    })
    console.log('kategori seçildi',this.state.kategori)
    this.props.history.push('/kategori')
  }

  siparisDevam=(seçili)=>{

    this.setState({
      ekran:seçili,
      sepetSeçke:false
    })
  }
  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  sepetButon=()=>{
    this.setState({
      sepetSeçke:true
    })
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
  urunAç=(urun)=>{
    let {kategori} = urun
    istek
      .post('/benzer', {kategori,urun})
      .then(ynt => {
        console.log('tercih ürünler', ynt.data)
        let {benzer,tercih} = ynt.data
        this.setState({
           benzer:benzer,
           tercih:tercih,
           seciliUrun:urun
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
    this.state.sepet.indexOf(urun)===-1 ?
      this.setState({
        sepet:[...this.state.sepet,urun],
        toplam:urun.miktar+this.state.toplam,
      }):console.log('zaten eklenmiş')
    console.log('sepet içeriği',this.state.sepet)
   this.seçkeAçKapa()

  }

  urunÇıkart = urun => {
    let urun_id=urun._id
    const index = this.state.sepet.findIndex(p => p._id === urun_id);
    if (index >= 0) {
      this.state.sepet.splice(index, 1);
      this.setState(this.state)
      this.toplamHesapla()
    }
    this.sepetMiktar(this.state.sepet.length)
  };
  mikarDeğiştir=(girdi,urunIndex,urun)=>{
    console.log('gelen veriler:--->Girdi:',girdi,' İndex: ',urunIndex)
    this.state.sepet[urunIndex].miktar+=girdi;
    if(this.state.sepet[urunIndex].miktar===0){
      this.urunÇıkart(urun)
    }
    this.setState(this.state);
    console.log('değişen değer',this.state.sepet[urunIndex])
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
          data.user!==null ?
            <div className="app dashboard">
              <AppHeader fixed>
                <Suspense >
                  <AdminHeader onLogout={e=>this.signOut(e)}/>
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
                  <DefaultHeader yanMenuAcKapa={this.yanMenuAcKapa}  sepet={this.state.sepet} salla={this.state.salla} sepetAçKapa={this.seçkeAçKapa} />
                </Suspense>
              </AppHeader>
              <div className="app-body">
                <SideSheet
                  position={'left'}
                  isShown={this.state.yanMenu}
                  onCloseComplete={()=>this.yanMenuAcKapa}
                  width={300}

                >

                 <div className="yan_menu">
                   <br/><br/>
                   <Label circular color="danger" onClick={this.yanMenuAcKapa} className="float-right">
                     <Icon icon="cross" color="danger" />
                   </Label>
                   <Arama yanMenuAcKapa={this.yanMenuAcKapa} aramaSonucu={this.urunAç} {...this.props}/>
                   <List animated className="kategori_listesi" selection verticalAlign='middle'>
                     {
                       this.state.kategoriler.map(kat=>
                         <List.Item selection={true}  key={kat._id} onClick={()=>this.kategoriSec(kat)}>
                           <span></span>
                           <List.Content>
                             <List.Header><span className="text-dark h3"><Header dividing> {kat.ad} </Header></span></List.Header>
                           </List.Content>
                         </List.Item>
                       )
                     }
                   </List>
                 </div>
                </SideSheet>

                <main className="main">
                  <AppBreadcrumb appRoutes={routes} router={router}/>
                  <Container fluid>
                    <SideSheet
                      position={'right'}
                      isShown={this.state.sepetSeçke}
                      onCloseComplete={() => this.seçkeAçKapa}
                      width={400} className="yan_seçke bg-clr_black">

                      <Sepet
                        seçkeAçKapa={this.seçkeAçKapa}
                        sepet={this.state.sepet}
                        miktarDeğiştir={this.mikarDeğiştir}
                        toplam={this.state.toplam}
                        urunÇıkart={this.urunÇıkart}
                        devam={this.siparisDevam}
                        {...this.props}


                      />
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
                                    ekranDegis={this.siparisDevam}
                                    sepetiBosalt={this.sepetiBosalt}
                                    kategoriSec={this.kategoriSec}
                                  />
                                )} />
                            ) : (null);

                          })}
                        <Redirect to="/" />
                      </Switch>
                    </Suspense>
                  </Container>
                </main>

              </div>
              <AppFooter>
                <Suspense >
                  <DefaultFooter />
                </Suspense>
              </AppFooter>
            </div>
        }
    </>


    );
  }
}

export default DefaultLayout;
