import React from 'react'

import { Grid} from "semantic-ui-react";


  const veri=[
    {
      img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/9.jpeg',
      link:'/nasil',
      açıklama:'Nasıl Sipariş verebilirim?'
    },
    {
      img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/5.jpeg',
      link:'/paketleme',
      açıklama:'Nasıl Paketleme Yapıyoruz?'
    },
    {
      img:'https://svgl.s3.eu-west-3.amazonaws.com/WhatsApp+Image+2020-04-15+at+21.51.21.jpg',
      link:'/heybe',
      açıklama:'Şifa Dolu Heybe'
    }
  ]
const ReklamGoster=props=>{

    return(
      <Grid divided='vertically'>
        <Grid.Row className='reklam_iskelet' columns={2}>
          <Grid.Column onClick={()=>props.history.push(veri[0].link)}>
            <img className="reklam_gorsel" src={veri[0].img} />
            <span className="reklam_cumle">{veri[0].açıklama}</span>
          </Grid.Column>
          <Grid.Column onClick={()=>props.history.push(veri[1].link)}>
            <img className="reklam_gorsel" src={veri[1].img} />
            <span className="reklam_cumle">{veri[1].açıklama}</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className='reklam_iskelet'  columns={1}>
          <Grid.Column onClick={()=>props.history.push(veri[2].link)}>
            <img className="reklam_gorsel" src={veri[2].img} />
            <span className="reklam_cumle">{veri[2].açıklama}</span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
}
export default ReklamGoster
