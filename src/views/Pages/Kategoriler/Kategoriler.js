import React from 'react'

import {Row,Col} from "reactstrap";
import {Header ,Label,Container} from "semantic-ui-react";
import {SelectMenu, Icon, Button} from 'evergreen-ui'
import Kaydırak from "../../Parcalar/Kaydırak";
import Urunler from "../../Main/Urunler";

class Kategoriler extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategori:[],
      urunler:[]
    }
  }


  componentDidMount() {
    console.log('kategori sayfa props',this.props)
    this.setState({
      urunler:this.props.urunler,
      kategori:this.props.kategori
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      kategori:nextProps.kategori,
      urunler:nextProps.urunler,
    })
    console.log('kategoriler sayfa props',nextProps)
  }


  render() {
    return(

    <Row>

      <Col xs="12">
        <Header dividing>

        <span className="h3 text-left">
              <SelectMenu
                title={<>Kagetori Seç <Icon marginLeft='75%' icon='caret-right' /></>}
                options={this.props.kategoriler.map(label =>({label:label.ad,value:label,}))}
                selected={this.props.kategori}
                onSelect={item => this.props.kategoriSec(item.value)}
                filterPlaceholder={"Filtrele..."}
              >
                < Button appearance='minimal' iconAfter="caret-down" marginRight={16}>{this.props.kategori || 'Kategori seç...'}</Button>
              </SelectMenu>

        </span>
          <span className="float-right"><Label>{this.state.urunler.length} ürün</Label></span>
        </Header>
        <br/>
      </Col>
      <Col xs="12">
      <div className="kateori_kapsam">
        <Row>
          {
            this.state.urunler.map(e=>
              <Col className="kategori_urunler" key={e._id} xs='6' md='4' lg='3'>
                <Urunler {...this.props} sepeteEkle={this.props.sepeteEkle} urunAç={this.props.urunAç} urun={e}/>
              </Col>
            )
          }
        </Row>
      </div>
      </Col>
    </Row>

    )
  }
}
export default Kategoriler
