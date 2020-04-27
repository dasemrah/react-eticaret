import React from 'react';
import {CornerDialog, Button} from "evergreen-ui";
import {Input,TextArea} from "semantic-ui-react";
import istek from '../../../istek'
import {toaster} from "evergreen-ui";

class Edit extends React.Component{
  constructor(props){
    super(props)
    this.state={
      ad        :'',
      aciklama  :'',
      fiyat     :0,
      net       :'',
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    const {urun} = nextProps
    this.setState({
      ad       : urun.ad,
      aciklama : urun.aciklama,
      net      : urun.net,
      fiyat    : urun.fiyat
    })
    console.log('ürün değişti',nextProps)
  }
  stok=(urunid,durum)=>{
    istek
      .post('/stok',{urunid:urunid,durum:durum})
      .then(ynt=>{
        console.log('ynt',ynt)
        toaster.success(durum ? 'Ürün markete eklendi' : 'Ürün stoktan kaldırıldı')
        this.props.gizle()
      })
      .catch(err=>console.log(err))
  }

  render() {
    const {ad,aciklama,net,fiyat}=this.state;
    const {urun} = this.props
    return(
      <>
        <CornerDialog
          intent='warning'
          title='Ürünü Düzenle'
          isShown={this.props.gorunme}
          onCloseComplete={() => this.props.gizle()}
          hasFooter={false}
          width={'100%'}
          marginRight={0}
        >
          <Input
            fluid
            placeholder={urun.ad}
            value={ad}
            onChange={e=>this.setState({ad:e.target.value})}
          />
          <br/>
          <TextArea
            placeholder={urun.aciklama}
            value={aciklama}
            onChange={e=>this.setState({aciklama:e.target.value})}
            style={{ minHeight: 100,width:'100%' }}
          />
          <br/>
          <Input
            fluid
            placeholder={urun.fiyat}
            value={fiyat}
            onChange={e=>this.setState({fiyat:e.target.value})}
          />
          <br/>
          <Input
            fluid
            placeholder={urun.net}
            value={net}
            onChange={e=>this.setState({net:e.target.value})}
          />
          <br/>
          <Button onClick={()=>this.stok(urun._id,urun.aktif ? false : true)} intent={urun.aktif ? 'warning' : ' '} iconAfter={urun.aktif ? 'cross' : 'add'} size={16} >
            {
              urun.aktif ===true ?
                <span>Satıştan Kaldır</span>
                :
                <span>Mağazaya Ekle</span>
            }
          </Button>
          <Button onClick={()=>this.props.duzenle(this.state)} intent='success' iconAfter='tick-circle'>Kaydet</Button>
        </CornerDialog>
      </>
    )
  }


}
export default Edit
