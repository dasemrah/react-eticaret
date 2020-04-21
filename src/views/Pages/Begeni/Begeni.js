import React,{useEffect, useState} from 'react'
import {Container, Segment, Header, Image, Grid, List, Button, Label, Icon} from "semantic-ui-react";
import {Col, Row} from 'reactstrap'
const BegeniSayfası=props=>{
  const [begeniler,setBegeni] = useState([])
  useEffect(()=>{
    console.log('beğeni sayfa props',props)
    setBegeni(props.begeni)
    console.log('beğeni state',begeniler)
  })

  return(
    <div>
      <Container fluid>
        <Header as='h2' textAlign='center' dividing block color='purple'>
          Beğendiğim Ürünler <Label> {begeniler.length} ürün</Label>
        </Header>
        <Row>
          {begeniler.map(e=>
            <Col xs="12" md='6' lg='4'>
              <Segment raised color="teal">
                <Grid>
                  <Grid.Column width={5}> <Image src={e.img} rounded size='small'/></Grid.Column>
                  <Grid.Column width={11}>
                    <List>
                      <List.Item><span className="text-dark h6 text-uppercase text-center floated">{e.ad}</span></List.Item>
                      <List.Item>
                        <List horizontal>
                          <List.Item>
                            <span className="text-danger h4"> {e.fiyat} ₺ </span>
                          </List.Item>
                          <List.Item>
                            <span className="h4 text-uppercase">{e.net}</span>
                          </List.Item>
                        </List>
                      </List.Item>
                      <List.Item>
                        <Button.Group>
                          <Button onClick={()=>props.beneniÇıkart(e)}><Icon name='minus'/></Button>
                          <Button.Or text=' ' />
                          <Button    onClick={()=>props.sepeteEkle(e)} color={props.sepet.indexOf(e)===-1 ? 'green' : 'black'}>{props.sepet.indexOf(e)===-1 ? <span>Sepete Ekle</span>: <span>Sepette</span>}</Button>
                        </Button.Group>

                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid>
              </Segment>
              <br/>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}
export default BegeniSayfası
