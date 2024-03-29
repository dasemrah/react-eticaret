import React from 'react'

import {Row,Col} from "reactstrap";
import {List} from "semantic-ui-react";
import {Nav, Icon, Affix} from 'rsuite'
import Urunler from "../../Main/Urunler";

class Kategoriler extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategori:[],
      urunler:[],
      active:''
    }
  }


  componentDidMount() {

    this.setState({
      urunler:this.props.urunler,
      kategori:this.props.kategori,
      active:this.props.kategori
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {

    this.setState({
      kategori:nextProps.kategori,
      urunler:nextProps.urunler,
    })

  }

  handleSelect=(activeKey) =>{
    this.props.kategoriSec(activeKey)
    this.setState({
      active:activeKey
    })
  }


  render() {
    const {active} = this.state
    const styles = { width: 100 };

    const CustomNav = ({ active, onSelect, ...props }) => {
      return (
        <Nav {...props} vertical activeKey={active} onSelect={d=>onSelect(d)} style={styles}>
          {this.props.kategoriler.map(e=>
            <Nav.Item key={e._id} eventKey={e}>{e.ad}</Nav.Item>
          )}

        </Nav>
      );
    };
    const MobileNav =()=>(
      <div className="mobile_kategoriler">

     <List horizontal relaxed='very' className="kategori_listesi">
       {
         this.props.kategoriler.map(e=>
           <List.Item key={e._id}>
             <a className={this.props.kategori=== e.ad ? 'mobile_aktif_liste' : ''} onClick={()=> this.props.kategoriSec(e)} >{e.ad}</a>
           </List.Item>
         )
       }
     </List>
      </div>
    )
    return(

    <Row>
     <Col xs='12'>
       <MobileNav/>
     </Col>
      <Col xs='12' md='2' lg='2'>
        <Affix top={100} className="kateori_dış_iskelet">
          <CustomNav active={active} onSelect={this.handleSelect} />
        </Affix>
      </Col>
      <Col xs="12" lg='10' md='10'>
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
