import React, { Component } from 'react';
import {Transition, Label, List, Icon} from "semantic-ui-react";
import { Menu, Popover, Button,toaster } from 'evergreen-ui'
import Arama from "../../views/Parcalar/Arama";

class DefaultHeader extends Component {
  constructor(props){
    super(props)
    this.state={
      duration: 500,
      visible: true,
      yanMenu:true,
      activeItem:false,
      aramaGörünürlük:false,
      kategoriler:[]

    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  aramaAçKapa=()=>{
    this.setState({
      aramaGörünürlük:!this.state.aramaGörünürlük
    })
}
  sepetAçKapa=()=>{
    console.log('tıklandı');
    this.props.sepetAçKapa(true)
    this.setState({
      visible:!this.state.visible
    })
  }
  yanMenuAçkapa=()=>{
    this.props.yanMenuAcKapa()
    this.setState({
      yanMenu:!this.state.yanMenu
    })
  }
  componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
          kategoriler:nextProps.kategoriler
        })
    console.log('header props-->',nextProps)
  }

  render() {
    const { activeItem, duration, visible,aramaGörünürlük } = this.state;
    return (
      <>
      <nav className="navbar navbar-expand-sm  navbar-light">
        <a className="navbar-brand" href="#">Nazlı Köy</a>
        <div className="sepet_dar_ekran">
          <Icon circular color='grey' name='search'  size='large' onClick={this.aramaAçKapa}/>
        </div>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">


          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#/">Ana Sayfa <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/sorgula">Sipariş Sorgula</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#/login">Giriş</a>
            </li>

          </ul>



        </div>
        <div style={aramaGörünürlük ? {visibility:"visible",display:"inline"} : {visibility:"hidden",display:"none"}}>
          <Arama {...this.props} />
        </div>
      </nav>
        </>
    );
  }
}


export default DefaultHeader;
