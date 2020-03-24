import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import api from '../../../istek';
class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      role:'admin',
      olay:false
    }
    this.handleChange=this.handleChange.bind(this);
    this.submit=this.submit.bind(this);
  }
  handleChange(e){
    const {name,value}=e.target;
    this.setState({
       [name]:value
    })
  }
  submit(){
    api.post('/signup',this.state)
      .then((resolve)=>{
        if(resolve.data.status===1){
          this.setState({olay:true})
        }
        console.log(resolve)
      })
      .catch((err)=>console.log(err))
  }
  handle
  render() {
    return (
      <div className="app flex-row align-items-center">
        {
          this.state.olay ?
            <Redirect to="/"/>
            :<></>
        }
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Hesap Oluştur</h1>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>

                    <Button onClick={this.submit} color="success" block> Hesap Oluştur</Button>
                  </Form>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
