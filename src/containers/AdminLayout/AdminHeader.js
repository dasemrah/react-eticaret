import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import istek from '../../istek'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
const data = require('../../data')
class AdminHeader extends Component {
  constructor(props){
    super(props)
    this.state={
      olay:false
    }

  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (

      <React.Fragment>
        {
          this.state.olay===true ?
            <Link to="/" />
            :
         <>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />


        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>

          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <i className="icon-user"> </i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={()=>this.props.ÇıkışYap()}><i className="fa fa-lock"></i>Çıkış Yap</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
         </> }
      </React.Fragment>
    );
  }
}

AdminHeader.propTypes = propTypes;
AdminHeader.defaultProps = defaultProps;

export default AdminHeader;
