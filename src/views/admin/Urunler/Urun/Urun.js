import React from 'react';
import {CardHeader,Alert,Button,ToastBody,ToastHeader,Toast,Col,Badge } from 'reactstrap';
import istek from '../../../../istek';

class Urun extends React.Component{
  constructor(props){
    super(props)
    this.state={
      olay:0,
      aktfiolay:0
    }
    this.delete=this.delete.bind(this);
    this.aktif=this.aktif.bind(this);
  }
  delete(){
    istek.post('/urundeaktif',{
      urun_id:this.props.urun_id
    }).then(ynt=>{
      if(ynt.data.olay===1){
        this.setState({
          olay:1
        })
      }

    }).catch(err=>console.log(err))
  }
  aktif(){
    istek.post('/aktif',{
      urun_id:this.props.urun_id
    }).then(ynt=>{
      if(ynt.data.olay===1){
        this.setState({
          aktfiolay:1
        })
      }

    }).catch(err=>console.log(err))
  }
  render() {
    return(
       <>
         {
           this.state.olay ===1 ?
             <Col xs="12" sm="6" lg="3">
               <Alert color="danger">
                 Bu ürün stoktan kaldırıldı!
               </Alert>
             </Col>
             :
             <Col xs="12" sm="6" lg="3">
               <Toast >
                 <ToastHeader>
                   <span className="h4 text-capitalize text-muted">{this.props.ad}</span>
                 </ToastHeader>

                 <ToastBody>
                   <img style={{width:'100%',height:'200px'}} src={this.props.img} className="img-thumbnail" alt=""/>
                   <p>{this.props.aciklama}</p>
                   <p> Fiyat: {this.props.fiyat} <Badge color="dark">₺</Badge></p>
                   <br/>
                   {this.props.aktif ===false ?
                   this.state.aktfiolay===1 ?
                   <>
                     <Alert color="success">Ürün Aktif Edildi</Alert>
                   </>
                   :
                   <>
                     <Button className="btn-success" onClick={this.aktif}> Aktif Et</Button>
                   </>
                   :
                   <Button className="btn-danger" onClick={this.delete}> <i className="icon-close"></i></Button>
                   }
                 </ToastBody>
               </Toast>
             </Col>
         }

       </>
    )
  }

}
export default Urun;
