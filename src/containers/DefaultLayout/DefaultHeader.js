import React, { Component } from 'react';
import {Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {Transition,Label} from "semantic-ui-react";

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
      yanMenu:true
    }
  }

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
    const { animation, duration, visible } = this.state;

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <>

        <Transition
          animation='pulse'
          duration={500}
          visible={this.state.yanMenu}
        >
          <img onClick={this.yanMenuAçkapa} src="https://img.icons8.com/color/48/000000/menu.png"/>
        </Transition>


        <AppNavbarBrand
          full={{ src: logo, width: 90, height: 57, alt: 'Köyden Gelsin Logo' }}
          minimized={{ src: sygnet, width: 45, height: 45, alt: 'Köyden Gelsi Logo' }}
        />


        <Nav className="d-md-down-none" navbar>

        </Nav>
        <Nav className="ml-auto" navbar>
          <Transition
            animation='tada'
            duration={duration}
            visible={visible}
          >
            <img onClick={this.sepetAçKapa} src="https://img.icons8.com/bubbles/58/000000/indian-girl-shopping-basket.png"/>
          </Transition>
          {
            this.props.sepet.length>0 ?
              <Label color='red' circular>
                {this.props.sepet.length}
              </Label>
              :null
          }

        </Nav>

      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
