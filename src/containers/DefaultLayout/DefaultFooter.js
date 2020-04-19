import React, { Component } from 'react';
import {Row,Col,Container} from 'reactstrap'
import {List} from 'semantic-ui-react'




class DefaultFooter extends Component {
  constructor(props){
    super(props)
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
<>
  <br/><br/>
      <Row>

        <Col xs="12" className="text-center h2 text-uppercase">Nazlı Köy</Col>
        <Col xs="6">
          <List animated verticalAlign='middle'>
            <List.Header as='a'><span className="h4 text-uppercase text-dark">Kurumsal</span></List.Header>
            <List.Item  onClick={()=>this.props.history.push('/hikaye')} as='a'>Hakkımızda</List.Item>
            <List.Item onClick={()=>this.props.history.push('/gizlilik')} as='a'>Gizlilik ve Çerezler</List.Item>
          </List>
        </Col>
        <Col xs="6">
          <List animated verticalAlign='middle'>
            <List.Header><span className="h4 text-uppercase text-dark">Bilgilendirme</span></List.Header>
            <List.Item onClick={()=>this.props.history.push('/nasil')} as='a'>Nasıl Sipariş Verebilirim</List.Item>
            <List.Item onClick={()=>this.props.history.push('/paketleme')} as='a'>Nasıl Paketleme Yapılıyor?</List.Item>
          </List>
        </Col>
      </Row>

</>
    );
  }
}

export default DefaultFooter;
