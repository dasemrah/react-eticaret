import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.number,
  fiyat:PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '87.500',
  icon: 'icon-people',
  color: 'info',
  value: '25',
  children: 'Visitors',
  invert: false,
};

class Widget04 extends Component {
  render() {
    const { className, cssModule,height, header, icon, color, value, children, fiyat, invert, ...attributes } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '',height:height, bgColor: '', icon: icon };

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);

    return (
      <Card style={{maxHeight:card.height}} className={classes} {...attributes}>
        <CardBody>
          <div className="h3 text-muted text-right mb-2">
            <img className="img-fluid" src={card.icon} alt=""/>
          </div>
          <div className="p mb-0">{header}</div>
          <small className="text-muted h5 text-uppercase font-weight-bold">{value} KG</small>
          <p className="text-dark h6 text-uppercase font-weight-bold">{value*fiyat} ₺</p>
          <Progress className={progress.style} color={progress.color} value={progress.value} />

        </CardBody>
      </Card>
    );
  }
}

Widget04.propTypes = propTypes;
Widget04.defaultProps = defaultProps;

export default Widget04;
