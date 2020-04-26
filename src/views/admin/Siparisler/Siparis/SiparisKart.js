import {Col} from "reactstrap";
import React from "react";
import {Table} from 'evergreen-ui'
import {Header,Button,Icon,Segment} from "semantic-ui-react";
const urunView =(urunler)=>(
  <>
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>
          Miktar
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
          Ürün
        </Table.TextHeaderCell>
      </Table.Head>
      <Table.Body>
        {urunler.map(e => (
          <Table.Row height="auto" key={e._id} isSelectable >
            <Table.TextCell>{e.net}</Table.TextCell>
            <Table.TextCell><span className="text-uppercase text-dark h5">{e.ad}</span></Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </>
)

const SiparisKart=props=>(


    <Col key={props.siparis._id} xs="12" md="3" lg="4">
      <Segment className="siparis-card" color="teal">

        <Button.Group attached="top">
          <Button
            positive>
            <a className="text-white" target="_blank" href={"https://api.whatsapp.com/send?phone="+props.siparis.telefon}>
              <Icon name="whatsapp"/>
              {props.siparis.telefon}
            </a>
          </Button>
          <Button.Or text="."/>
          {props.siparis.durum !==7 ?
            <Button color="orange" circular floated="right" icon onClick={()=>props.seviye(props.siparis._id)} >
              <Icon name='arrow alternate circle right outline' />
            </Button>
            :null
          }
        </Button.Group>

        <br/>
        <h3 className="siparis-card-text"> <i className="icon-user"> {props.siparis.ad} </i></h3>
        <h3 className="siparis-card-text"><i className="icon-location-pin"> {props.siparis.adres}</i> </h3>


        <h3 className="siparis-card-text"> <i className="icon-clock"> Tarih: {props.siparis.tarih.slice(0,props.siparis.tarih.length-14)} </i></h3>
        {props.siparis.durum ===0 ? <h3 className="siparis-card-text"><i className="icon-credit-card"> Ücret: {props.siparis.ucret} ₺ </i>  </h3>: <></>}
        <br/>
        <Header as='h3' dividing>
          Ürünler
        </Header>
        {urunView(props.siparis.Urunler)}

      </Segment>
      <br/><br/>
    </Col>
)
export default SiparisKart
