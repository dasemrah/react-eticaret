import React, {useState,useEffect} from 'react'
import {Alert, Icon} from 'evergreen-ui'
import {Label, Header, Grid, Image, Divider,Segment} from "semantic-ui-react";
import {Button} from 'evergreen-ui'
const Sepet =props=>{
  const [visible,setVisible] = useState(true)
  useEffect(()=>{
    console.log('Sepet Sayfası:-_->',props)
    setVisible(props.visible)
  })
  function urunÇıkart(urun) {
    setVisible(!visible);
    props.urunÇıkart(urun)
    console.log('dsadsa')
  }
  function devam() {
    props.seçkeAçKapa()
    props.history.push('/siparis')
  }
  const ÜrünleriGöster =()=>{

      return(
        <Segment inverted color="yellow">

          <Header as='h2' textAlign='center'>
            <Icon icon="cross" color="danger" marginRight={'100%'} size={24} onClick={()=>props.seçkeAçKapa()}/>
            Sepetim
          </Header>
          <br/>
          <Grid>
            {props.sepet.map(urun=>
             <Segment inverted color="yellow">
               <Grid>
                 <Grid.Row key={urun._id}>
                   <Grid.Column width={4}>
                     <Image src={urun.img}  />
                   </Grid.Column>
                   <Grid.Column width={9}>
                     <h4 className="h4 text-uppercase text-dark text-left">{urun.ad}</h4>
                     <p className="text-dark"> {urun.net}</p>
                     <Icon icon="minus" color="muted" marginRight={16} onClick={()=>props.miktarDeğiştir(-1,props.sepet.indexOf(urun),urun)}/>
                     <span className="text-dark text-center floated">{urun.miktar} adet</span>
                     <Icon icon="plus" color="muted" marginLeft={16} onClick={()=>props.miktarDeğiştir(1,props.sepet.indexOf(urun))} />
                     <br/>
                     <span className="text-light h3">Ücret: {urun.miktar*urun.fiyat} ₺</span>
                   </Grid.Column>
                   <Grid.Column width={3}>
                     <Icon icon="ban-circle" color="danger" marginLeft={16}  onClick={()=>urunÇıkart(urun)}/>
                   </Grid.Column>
                 </Grid.Row>
               </Grid>
               <Divider/>
             </Segment>
            )}

          </Grid>
          <br/>
          {props.sepet.length>0 ?
              <div className="align-items-center text-center">
                <Header>
                  Toplam <Label color="green" circular>{props.sepet.length}</Label> ürün
                </Header>
                <Button onClick={()=>devam()} intent={'success'} height={25} iconAfter="arrow-right">
                  Siparişi Onayla
                </Button>

              </div>
            :
            <Alert
              intent="warning"
              title="Sepetiniz boş"
              marginBottom={32}
              style={{width:'100%'}}
            />
          }
          <br/><br/><br/>
         </Segment>
      )
  }
  return(<ÜrünleriGöster/>)
}
export default Sepet;
