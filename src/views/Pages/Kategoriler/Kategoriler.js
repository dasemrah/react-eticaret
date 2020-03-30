import React from 'react'
import Urunler from "../../Main/Urunler";
import {Row,Col} from "reactstrap";
import {Header,Label} from "semantic-ui-react";
import {Button,SelectMenu} from 'evergreen-ui'


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
                title="Kagetori Seç"
                options={this.props.kategoriler.map(label =>({label:label.ad,value:label,}))}
                selected={this.props.kategori}
                onSelect={item => this.props.kategoriSec(item.value)}
                filterPlaceholder={"Filtrele..."}
              >
                < Button iconAfter="caret-down" marginRight={16}>{this.props.kategori || 'Kategori seç...'}</Button>
              </SelectMenu>

        </span>
          <span className="float-right"><Label>{this.state.urunler.length} ürün</Label></span>
        </Header>
      </Col>
      <Col xs="12">
        <Row className="kategori">
          {this.state.urunler.map(urun=>
            <Col xs="6" lg="3" md="4">
              <Urunler {...this.props} urun={urun}/>
            </Col>
          )}

        </Row>
      </Col>
    </Row>

    )
  }
}
export default Kategoriler
