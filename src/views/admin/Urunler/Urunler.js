import React, { Component, } from 'react';
import {Col,Row} from 'reactstrap';
import {Container, Grid, Image, List, Segment,} from 'semantic-ui-react';
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
      console.log(this.state.kategoriler)
    }).catch((err)=>console.log(err));
  }
  kategoriSec=(kategori)=>{
    this.setState({
      kategori    : kategori,
      kategoriAdı : kategori.ad,
      urunler     : kategori.urunler,
    })
  }
  duzenle=(value)=>{
    let nesne=this.state.duzenle_urun;
    console.log('düzenleme sonucu--->',value)

    nesne.ad        = value.ad;
    nesne.aciklama  = value.aciklama;
    nesne.net       = value.net;
    nesne.fiyat     = value.fiyat;
    nesne.img       = value.file_url;
    api.post('/urunduzenle',{nesne:nesne})
      .then(ynt=>{
        console.log('ynt',ynt)
        let {status,nesne}=ynt.data
        if(status){
          console.log('nesne--->',nesne)
          this.props.history.push('/')
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
        <Edit duzenle={this.duzenle} urun={this.state.duzenle_urun} gorunme={this.state.edit} gizle={()=>this.setState({edit:false})}/>
        <Container>

          <Row>
            {urunler.map(e=>
              <Col xs="12" md='6' lg='4' key={e._id}>
                <Segment raised color="teal">
                  <Grid>
                    <Grid.Column width={5}> <Image src={e.img} rounded size='small'/></Grid.Column>
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
                </Segment>
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

