import React from "react";
import {Embed, Segment,Divider, Header,Image} from "semantic-ui-react";
const görseller=[
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/1.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/2.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/3.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/4.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/5.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/6.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/7.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/8.jpeg'},
  {img:'https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/9.jpeg'},
]
const metin='Sipariş verdiğiniz ürün, havalı poşetler ile en az 2 kat sarılarak, kolilerde her türlü darbeye karşı zarar görmeyecek şekilde, özenle paketlenmektedir.'
const Paketleme =()=>{
  return(
    <>

        <Header as='h2' icon textAlign='center'>
          <img src="https://img.icons8.com/nolan/96/packaging.png"/>
          <Header.Content>Nasıl Paketleme Yapıyoruz?</Header.Content>
          <Divider/>
          <Header.Subheader >
           <span className="text-light"> {metin}</span>
          </Header.Subheader>
        </Header>
        <Embed
          autoplay={false}
          brandedUI
          color='white'
          hd={true}
          icon='video play'
          placeholder='https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/8.jpeg'
          url='https://svgl.s3.eu-west-3.amazonaws.com/sayfalar/VIDEO-1.mp4'
        />
        <br/>
        <Image.Group>
          {görseller.map(görsel=><>
            <Image className="sayfa_gorsel" src={görsel.img}  size='massive' rounded/>
            <Divider section/>
          </>)}
        </Image.Group>
    </>
  )
}
export default Paketleme
