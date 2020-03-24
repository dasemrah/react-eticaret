import React from 'react'
import Urunler from "../../Main/Urunler";
import {Row,Col} from "reactstrap";
import {Header} from "semantic-ui-react";
import {Menu,Button,Popover} from 'evergreen-ui'

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

    <div>
      <Header color="olive" dividing>
        <span className="h3 text-left">
          <Popover
            position="left"
            content={
              <Menu>
                {this.props.kategoriler.map(kategori =>
                  <Menu.Item onSelect={() => this.props.kategoriSec(kategori)}>
                    {kategori.ad}
                  </Menu.Item>
                )}
              </Menu>
            }
          >
              < Button marginRight={16}>{this.props.kategori}</Button>
          </Popover>
        </span>
        <span className="h3 float-right">{this.state.urunler.length} ürün</span>
      </Header>
      <Row>
        {this.state.urunler.map(urun=>
          <Col xs="6" lg="3" md="4">
            <Urunler {...this.props} urun={urun}/>
          </Col>
        )}

      </Row>
    </div>

    )
  }
}
export default Kategoriler
