import React, { Component, } from 'react';
import {Redirect,Route} from 'react-router-dom';

import {Col,Row,CardBody,Card,CardHeader} from 'reactstrap';
import api from "../../../istek";
import Urun from '../Urunler/Urun/Urun'

class Urunler extends Component {
  constructor(props){
    super(props)
    this.state={
      kategoriler:[]
    }
  }
  componentDidMount() {
    api.get('/urunler').then((ynt)=>{

      this.setState({kategoriler:ynt.data.foundUrun})
      console.log(this.state.kategoriler)
    }).catch((err)=>console.log(err));
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">

          <Row>
            {
              this.state.kategoriler.map(kategori=>
              <>
                  <Col xs="12">
                    <Card>
                        <CardHeader>
                          <h2 className="text-muted text-capitalize">   {kategori.ad}</h2>
                        </CardHeader>
                      <CardBody>
                        <Row>
                          {
                            kategori.urunler.map(urun=>
                              <>
                                <Urun
                                  ad={urun.ad}
                                  img={urun.img}
                                />
                              </>
                            )
                          }
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
              </>
              )
            }
          </Row>


      </div>
    );
  }
}

export default Urunler;

