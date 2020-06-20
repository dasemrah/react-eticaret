import React, { Component } from 'react';
import {Panel, Button, IconButton, Icon, Alert, Input} from "rsuite";
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

  }

  submit= () =>{
    api.post('/signin',this.state)
      .then((resolve)=>{
        if(resolve.data.status===1){
          this.props.login(resolve.data.user)
          console.log('Kullanıcı',data.user)
          this.props.history.push('/')
        }else if(resolve.data.status===0){
          Alert.error('Kulanıcı adı veya parola yanlış girildi', 5000)
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
              <Panel className="login_page" header='Yönetici Girişi'>
                <span>Kullanıcı adı</span>
                <Input
                  value={this.state.username}
                  onChange={e => this.setState({username:e})}
                  type="text"
                  placeholder="kullanıcı adı"
                  autoComplete="username"
                />
                <span>Şifre</span>
                <Input
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({password:e})}
                  placeholder="şifre"
                  autoComplete="current-password"
                />
                <IconButton onClick={() => this.submit()} placement='right' color='green' icon={<Icon icon='angle-right' />}>
                  Giriş Yap
                </IconButton>
              </Panel>
    );
  }
}

export default Login;
