import React, { Component } from 'react';
import {Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {Transition,Label} from "semantic-ui-react";
import {Icon} from 'evergreen-ui'

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
          <Icon size={24} marginLeft={10}  onClick={this.yanMenuAçkapa} icon="menu" color="selected" marginRight={16} />
        </Transition>


        <AppNavbarBrand onClick={()=>this.props.history.push('/')}
          full={{ src: logo, width: 90, height: 57, alt: 'Sevgül Hanım' }}
          minimized={{ src: sygnet, width: 45, height: 45, alt: 'Sevgül Hanım' }}
        />


        <Nav className="d-md-down-none" navbar>

        </Nav>
        <Nav className="ml-auto" navbar>
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

        </Nav>

      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
