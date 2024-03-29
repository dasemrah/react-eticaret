import React, { Component } from 'react';
import Arama from "../../views/Parcalar/Arama";
import {Drawer, IconButton, Icon} from "rsuite";
import {Image} from "semantic-ui-react";

class DefaultHeader extends Component {
  constructor(props){
    super(props)
    this.state={
      duration: 500,
      visible: true,
      yanMenu:true,
      activeItem:false,
      aramaGörünürlük:false,
      kategoriler:[]

    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  sepetAçKapa=()=>{
    console.log('tıklandı');
    this.props.sepetAçKapa(true)
    this.setState({
      visible:!this.state.visible
    })
  }
  yanMenuAçkapa=()=>{
    this.props.yanMenuAcKapa()
    this.setState({
      yanMenu:!this.state.yanMenu
    })
  }
  componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
          kategoriler:nextProps.kategoriler
        })

  }

  render() {
    const { activeItem, duration, visible,aramaGörünürlük } = this.state;
    return (
      <>
      <nav className="navbar navbar-expand-sm  navbar-light">
        <div onClick={()=>this.props.yanMenuAcKapa()} className="sol_menu_buton">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <a className="navbar-brand" href="#">
          <img className="logo" src={require('../../assets/img/logo.png')} alt=""/>
        </a>
        <div className="sepet_dar_ekran">
          <Icon icon='search' size='lg' onClick={()=>this.props.aramaAçKapa()}/>
        </div>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#/">Ana Sayfa <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/sorgula">Siparişlerim</a>
            </li>

          </ul>



        </div>
        <Drawer className="arama_katman" size='xs' placement='top' show={this.props.aramaGörünürlük} onHide={()=>this.props.aramaAçKapa()}>
          <Arama  {...this.props} />
        </Drawer>
      </nav>
        </>
    );
  }
}


export default DefaultHeader;
