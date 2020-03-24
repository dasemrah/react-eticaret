import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button,Jumbotron, Input, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap';
import api from "../../../istek";
const data=require('../../../data')
class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
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
    api.post('/signin',this.state)
      .then((resolve)=>{
        if(resolve.data.status===1){
          this.setState({olay:true})
          data.user=resolve.data.user
          console.log('Kullanıcı',data.user)
        }
        console.log(resolve)
      })
      .catch((err)=>console.log(err))
  }
  render() {
    return (
      <div>
        {
          this.state.olay ?
            <Redirect to="/"/>
            :<></>
        }

              <Jumbotron>
                <Alert color="warning"><h5 className="text-dark text-capitalize">bu sayfa sadece yöneticiler İçindir</h5></Alert>

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
                <Button onClick={this.submit} color="primary" className="px-4 btn-primary"><i className="icon-login"></i></Button>
              </Jumbotron>

      </div>
    );
  }
}

export default Login;
