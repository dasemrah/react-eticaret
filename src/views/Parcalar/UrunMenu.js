import React from "react";
import {List,Image} from "semantic-ui-react";

class UrunMenu extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategoriler:[],
      kategori:[]
    }
  }
 componentWillReceiveProps(nextProps, nextContext) {
   console.log('ürün menu---->',nextProps.kategoriler)
   this.setState({
     kategoriler:nextProps.kategoriler
   })
 }

  render() {
    return (
        <List className="kategori_listesi" selection verticalAlign='middle'>
          {
            this.state.kategoriler.map(kat=>
              <List.Item key={kat._id} onClick={()=>this.props.kategoriSec(kat)}>
               <span></span>
                <List.Content>
                  <List.Header><span className="text-dark h3">{kat.ad}</span></List.Header>
                </List.Content>
              </List.Item>
            )
          }
        </List>
    );
  }
}
export default UrunMenu
