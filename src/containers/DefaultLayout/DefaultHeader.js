import React, { Component } from 'react';
import {Transition, Label, List} from "semantic-ui-react";
import {Icon, Menu, Popover, Button,toaster } from 'evergreen-ui'
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

         <List horizontal>
           <List.Item>
              <Icon icon='search' onClick={this.aramaAçKapa} size={16} marginBottom={15}/>
           </List.Item>
           <List.Item>
             <Icon icon='heart' size={16} marginBottom={15} onClick={()=>this.props.history.push('/begen')}/>
             <Label size='mini' circular color='purple'>
               {this.props.begeni.length}
             </Label>
           </List.Item>
           <List.Item>
             <Icon icon='shopping-cart' marginBottom={15} size={16} onClick={this.sepetAçKapa}/>
             {
               this.props.sepet.length>0 ?
                 <Label size='mini' color='red' circular>
                   {this.props.sepet.length}
                 </Label>
                 :null
             }
           </List.Item>
           <List.Item>
             <Icon className="yan_menu_iconu" size={16} marginLeft={10} marginBottom={15} onClick={this.yanMenuAçkapa}  icon="menu" />
           </List.Item>
         </List>


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
            <li>
              <Popover
                content={
                  <Menu>
                    <Menu.Group>
                      {
                        this.state.kategoriler.map(e=>

                        <Menu.Item key={e._id}
                          secondaryText={<>{e.urunler.length} <Icon icon='caret-right'/> </>}>
                          <Popover
                            content={
                              <Menu>
                                <Menu.Group>
                                  {e.urunler.map(u=>
                                    <Menu.Item key={u._id} onSelect={()=>this.props.urunAç(u)}>
                                      {u.ad}
                                    </Menu.Item>
                                  )}
                                </Menu.Group>
                              </Menu>
                            }
                          >
                            <Button width='100%' appearance='minimal' marginRight={16}>{e.ad}</Button>
                          </Popover>
                        </Menu.Item>

                      )}
                    </Menu.Group>
                  </Menu>
                }
              >
                <Button appearance='minimal' iconAfter='caret-down' >Ürünler</Button>
              </Popover>
            </li>
          </ul>
          <List horizontal>
            <List.Item><i onClick={()=>this.props.history.push('/begen')} className="icon-heart h2"></i></List.Item>
            <List.Item>
              <i onClick={this.sepetAçKapa}  className="icon-basket h2 text-uppercase"></i>
              {
                this.props.sepet.length>0 ?
                  <Label color='red' circular>
                    {this.props.sepet.length}
                  </Label>
                  :null
              }
            </List.Item>
            <List.Item>
              <Arama {...this.props} />
            </List.Item>
          </List>


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
