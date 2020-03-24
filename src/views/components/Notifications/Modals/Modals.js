import React, { Component } from 'react';
import { Button,Jumbotron, CardFooter,Alert,Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class Modals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: false,
      sepettevar:0
    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }
  toggleInfo() {
    this.setState({
      info: !this.state.info,
    });
  }

  render() {
    return (

      <div className="animated fadeIn">


                <Button  onClick={this.toggleInfo} className=" btn-info">
                   <i className="icon-bag text-light"> Sepete Ekle </i>
                </Button>
                <Modal isOpen={this.state.info} toggle={this.toggleInfo}
                       className="modal-info">

                  <ModalHeader className="align-content-center">
                    <h4 className="text-center">{this.props.urun.ad}</h4>
                  </ModalHeader>
                  <ModalBody>

                        {this.props.sepet}
                  </ModalBody>
                      <ModalFooter>
                    {
                      this.props.urunler.map(sepeturun=>
                        sepeturun.urun._id===this.props.urun._id ?
                          <Row>
                            <Col lg="12" md="12" xs="12">
                              <Alert color="success"><h5 className="text-dark">{sepeturun.kg} KG {this.props.urun.ad} Eklendi</h5></Alert>

                            </Col>
                            <Col lg="12" md="12" xs="12">
                              <br/>
                              <Button className="btn-info" onClick={this.toggleInfo}>
                                <span className="text-white">Alışverişe Devam Et <i className="icon-arrow-right-circle"> </i></span>
                              </Button>

                            </Col>

                          </Row>

                          :<></>
                      )
                    }
                      </ModalFooter>

                </Modal>

      </div>
    );
  }
}

export default Modals;
