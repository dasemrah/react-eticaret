import React, { Component } from 'react';
import {Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {Transition,Label,Menu,Segment} from "semantic-ui-react";
import {Icon} from 'evergreen-ui'
import Arama from "../../views/Parcalar/Arama";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props)
    this.state={
      duration: 500,
      visible: true,
      yanMenu:true,
      activeItem:false,
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
      visible:nextProps.salla
    })
    console.log('salla değişti',nextProps)
  }

  render() {
    const { activeItem, duration, visible } = this.state;
    return (
      <>
      <nav className="navbar navbar-expand-sm  navbar-light">
          <Transition
            animation='pulse'
            duration={500}
            visible={this.state.yanMenu}
          >
            <Icon className="yan_menu_iconu" size={24} marginLeft={10}  onClick={this.yanMenuAçkapa} icon="menu" marginRight={16} />
          </Transition>
        <a className="navbar-brand" href="#">Nazlı Köy</a>
        <div className="sepet_dar_ekran">
          <Transition
            animation='tada'
            duration={duration}
            visible={visible}
          >
            <i onClick={this.sepetAçKapa}  className="icon-basket h2 text-uppercase"></i>
          </Transition>
          {
            this.props.sepet.length>0 ?
              <Label color='red' circular>
                {this.props.sepet.length}
              </Label>
              :null
          }
        </div>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">


          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#/">Ana Sayfa <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/sorgula">Sipariş Sorgula</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#/login">Giriş</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <Arama {...this.props} />
          </form>
          <Transition
            animation='tada'
            duration={duration}
            visible={visible}
          >
            <i onClick={this.sepetAçKapa}  className="icon-basket h2 text-uppercase"></i>
          </Transition>
          {
            this.props.sepet.length>0 ?
              <Label color='red' circular>
                {this.props.sepet.length}
              </Label>
              :null
          }
        </div>
      </nav>
        </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
