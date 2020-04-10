import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Container, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import {Segment} from "semantic-ui-react";
import {Button, Alert} from 'evergreen-ui'
import api from "../../../istek";
const data=require('../../../data')
class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      olay:false,
      hata:false
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
    api.post('/signin',this.state)
      .then((resolve)=>{
        if(resolve.data.status===1){
          this.props.login(resolve.data.user)
          console.log('Kullanıcı',data.user)
          this.props.history.push('/')
        }else if(resolve.data.status===0){
          this.setState({hata:true})
        }
        console.log(resolve)
      })
      .catch((err)=>console.log(err))
  }
  componentDidMount() {
    console.log('login props-->',this.props)
  }

  render() {
    return (
      <div>
            <Container>
              <Segment color="orange">
                {this.state.hata ?
                  <Alert
                    intent="danger"
                    title="Kullanıcı adı veya şifre hatalı girildi"
                  />
                  :
                  <Alert
                    intent="warning"
                    title="Bu sayfa sadece yöneticiler içindir"
                    marginBottom={32}
                  />}
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user text-info"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="Username" autoComplete="username" />
                </InputGroup>
                <InputGroup className="mb-4">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-lock text-danger"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" autoComplete="current-password" />
                </InputGroup>
                <Button onClick={this.submit} intent="success" height={24} iconAfter="arrow-right">
                  Giriş Yap
                </Button>

              </Segment>
            </Container>

      </div>
    );
  }
}

export default Login;
