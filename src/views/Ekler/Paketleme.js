import React from "react";
import {Embed, Container, Header,Image} from "semantic-ui-react";
import {Col, Row} from 'reactstrap'
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

          <Header.Content><h3 className="text-center"><span>Nasıl Paketleme Yapıyoruz?</span></h3></Header.Content>
          <br/>
          <Header.Subheader >
           <span className="text-dark"> {metin}</span>
          </Header.Subheader>
        </Header>
      <br/>
        <Container>
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
            <Row>
                {görseller.map(görsel=><>
                  <Col xs='6' lg='3' md='3'>
                    <Image className="sayfa_gorsel" src={görsel.img}  size='massive' rounded/>
                    <br/>
                  </Col>
                </>)}
            </Row>
        </Container>
    </>
  )
}
export default Paketleme
