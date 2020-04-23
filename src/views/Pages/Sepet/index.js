import React, {useState,useEffect} from 'react'
import {Alert, Icon} from 'evergreen-ui';
import {List, Header, Grid, Image, Button, Divider} from "semantic-ui-react";
const Sepet =props=>{
  const [visible,setVisible] = useState(true)
  const [ucret,setUcret] = useState(0)
  useEffect(()=>{
    setVisible(props.visible)
    var toplam=0
    props.sepet.map(urun=>toplam+=(urun.miktar*urun.fiyat))
    setUcret(toplam)
  })
  const urunÇıkart =(urun) =>{
    setVisible(!visible);
    props.urunÇıkart(urun)
  }
  function devam() {
    props.seçkeAçKapa()
    props.history.push('/siparis')
  }
  const ÜrünleriGöster =()=>{

      return(
        <div className="sepet_arka">

          <Header as='h2' textAlign='center'>
            <br/>
            <Icon icon="arrow-left" marginTop={20}  marginRight={'100%'} size={24} onClick={()=>props.seçkeAçKapa()}/>
            <Header as='h2' textAlign='center' dividing>
              Sepetim
              <Header.Subheader>
                {props.sepet.length} ürün
              </Header.Subheader>
            </Header>
          </Header>
          <br/>
          <Grid>
            {props.sepet.map(urun=>
             <div key={urun._id} className="sepet_eleman">
               <Grid>
                 <Grid.Row>
                   <Grid.Column width={4}>
                     <Image size='tiny' style={{width: '100%', height: '75px'}} src={urun.img}  />
                   </Grid.Column>
                   <Grid.Column width={9}>
                     <h4 className="h4 text-uppercase text-dark text-left">{urun.ad}</h4>
                     <p className="text-dark"> {urun.net}</p>
                      <span className="sepet_miktar">
                        <Icon icon="minus" color="muted" marginRight={16} onClick={()=>props.miktarDeğiştir(-1,props.sepet.indexOf(urun),urun)}/>
                        <span className="text-dark text-center floated">{urun.miktar} adet</span>
                        <Icon icon="plus" color="muted" marginLeft={16} onClick={()=>props.miktarDeğiştir(1,props.sepet.indexOf(urun))} />
                      </span>
                     <span className="text-warning text-right floated h4"> {urun.miktar*urun.fiyat} ₺</span>
                   </Grid.Column>
                   <Grid.Column width={3}>
                     <Icon icon="cross" color='warning'  marginLeft={16}  onClick={()=>urunÇıkart(urun)}/>
                   </Grid.Column>
                 </Grid.Row>
               </Grid>
               <Divider />
             </div>
            )}

          </Grid>
          <br/>
          {props.sepet.length>0 ?
              <div className=" text-center sepet_onay">
                <br/>
               <List horizontal>
                 <List.Item>
                   <span className="text-uppercase text-dark">Ücret: {ucret} ₺</span>
                 </List.Item>
                 <List.Item>
                   <Button color='orange' onClick={()=>devam()}>
                     Sepeti Onayla
                   </Button>

                 </List.Item>
               </List>
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
         </div>
      )
  }
  return(<ÜrünleriGöster/>)
}
export default Sepet;
