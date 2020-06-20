import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {Icon, IconButton} from "rsuite";
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
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <IconButton circle icon={  <Icon  icon='cog' />} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={()=>this.props.ÇıkışYap()}>
                <IconButton placement='right' icon={<Icon icon='exit' />}>
                  Çıkış
                </IconButton>
              </DropdownItem>
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
