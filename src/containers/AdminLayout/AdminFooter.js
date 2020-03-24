import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>&copy; Sevgül Hanım</span>
        <span className="ml-auto">Powered by <a target="_blank" href="https://www.linkedin.com/in/emrah-karahan/">Emrah Karahan</a></span>
      </React.Fragment>
    );
  }
}

AdminFooter.propTypes = propTypes;
AdminFooter.defaultProps = defaultProps;

export default AdminFooter;
