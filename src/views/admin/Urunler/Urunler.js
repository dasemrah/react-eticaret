import React, { Component, } from 'react';
import {Col,Row} from 'reactstrap';
import {Container, Grid, Image, List} from 'semantic-ui-react';
import {Alert, Panel} from "rsuite";
import api from "../../../istek";
import {Button, SelectMenu} from "evergreen-ui";
import Edit from './Edit'
class Urunler extends Component {
  constructor(props){
    super(props)
    this.state={
      kategoriler:[],
      kategori:[],
      kategoriAdı:'',
      urunler:[],
      edit:false,
      duzenle_urun:[]
    }
  }

  componentDidMount() {
    api.get('/urunler').then((ynt)=>{
        let {foundUrun} =ynt.data
      this.setState({
        kategoriler : foundUrun,
        kategori    : foundUrun[0],
        kategoriAdı : foundUrun[0].ad,
        urunler     : foundUrun[0].urunler
      })
      this.state.urunler.map(e=>{
        this.gorselver(e.gorsel,e._id)
      })
      console.log(this.state.kategoriler)
    }).catch((err)=>console.log(err));
  }
  componentWillUpdate(nextProps, nextState, nextContext) {

  }

  gorselver = (gorselID,urunID)=>{
    let index = this.state.urunler.findIndex(p=>p._id=== urunID )
    if(index >=0 && gorselID !==null){
      api
        .post('gorselver',{gorselID:gorselID})
        .then(ynt=>{
          console.log('görsel alındı',ynt.data.img)
          this.state.urunler[index].gorsel=ynt.data.img
          this.setState(this.state)
        })
    }
  }
  kategoriSec=(kategori)=>{
    this.setState({
      kategori    : kategori,
      kategoriAdı : kategori.ad,
      urunler     : kategori.urunler,
    })
    this.state.urunler.map(e=>{
      this.gorselver(e.urun,e._id)
    })
  }
  stok=(e)=>{
    this.state.duzenle_urun.aktif=e
    this.setState(this.state)
    console.log('ürün aktivitesi', this.state.duzenle_urun)
  }
  indirim=(e)=>{
    this.state.duzenle_urun.indirimde=e
    this.setState(this.state)
    console.log('indirim bilgisi',this.state.duzenle_urun)
  }
  duzenle=(urun)=>{
    let nesne=this.state.duzenle_urun;

    console.log('ürün parametreleri----> ', nesne)
    const {ad, aciklama, net, gorsel, fiyat} = urun

    nesne.ad        = ad;
    nesne.aciklama  = aciklama;
    nesne.net       = net;
    nesne.fiyat     = fiyat;
    nesne.gorsel    = gorsel;

    api.post('/urunduzenle',{nesne:nesne})
      .then(ynt=>{
        let {status,nesne}=ynt.data
        if(status){
          console.log('nesne--->',nesne)
          Alert.success('Ürün aydedildi', 5000)
          let index = this.state.urunler.findIndex(p=>p._id===nesne._id)
          if(index>=0){
            this.state.urunler.slice(index,1,nesne)
            this.setState({
              duzenle_urun:nesne
            })
          }
        }
      })
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
      const {urunler} = this.state
    return (
      <div className="animated fadeIn">
        <SelectMenu
          title="Kagetori Seç"
          options={this.state.kategoriler.map(label =>({label:label.ad,value:label,}))}
          selected={this.state.kategoriAdı}
          onSelect={item => this.kategoriSec(item.value)}
          filterPlaceholder={"Filtrele..."}
        >
          < Button iconAfter="caret-down" marginRight={16}>{this.props.kategori || 'Kategori seç...'}</Button>
        </SelectMenu>
        <br/>
        <Edit stok={this.stok} indirim={this.indirim} duzenle={this.duzenle} urun={this.state.duzenle_urun} gorunme={this.state.edit} gizle={()=>this.setState({edit:false})}/>
        <Container>

          <Row>
            {urunler.map(e=>
              <Col xs="12" md='6' lg='4' key={e._id}>
                <Panel shaded>
                  <Grid>
                    <Grid.Column width={5}> <Image src={e.gorsel.data} rounded size='small'/></Grid.Column>
                    <Grid.Column width={11}>
                      <List>
                        <List.Item><span className="text-dark h6 text-uppercase text-center floated">{e.ad}</span></List.Item>
                        <List.Item>
                          <List horizontal>
                            <List.Item>
                              <span className="text-danger h4"> {e.fiyat} ₺ </span>
                            </List.Item>
                            <List.Item>
                              <span className="h4 text-uppercase">{e.net}</span>
                            </List.Item>
                          </List>
                        </List.Item>
                        <List.Item>
                          <Button onClick={()=>this.setState({edit:true,duzenle_urun:e})} intent='warning' iconAfter='edit'>
                            Düzenle
                          </Button>
                        </List.Item>
                      </List>
                    </Grid.Column>
                  </Grid>
                </Panel>
                <br/>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Urunler;

