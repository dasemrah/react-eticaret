import {Col} from "reactstrap";
import React,{useState} from "react";
import {Table} from 'evergreen-ui'
import {Header,Button,Icon,Segment} from "semantic-ui-react";
import {Message, Drawer, Modal, Panel} from "rsuite";

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

const SiparisKart=props=>{
  const [sildirici,Sildirici] = useState(false)
  const Sildir=()=>(
    <Modal
      size={'xs'}
      placement={'bottom'}
      show={sildirici}
      onHide={()=>Sildirici(false)}
    >
      <Modal.Header>
        <Modal.Title>Bu sipariş silinsin mi?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Button color={'red'} labelPosition={'right'} icon='delete' onClick={()=>props.siparisSil(props.siparis)}>Sil</Button>
      </Modal.Body>
      <Modal.Footer>

        <Button onClick={()=>Sildirici(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return(
    (


      <Col key={props.siparis._id} xs="12" md="6" lg="6">
        <Panel style={{backgroundColor:'white'}} shaded>

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
          <h3 className="siparis-card-text"><i className="icon-credit-card"> Ürün ücreti {props.siparis.ucret}</i></h3>
          <h3 className="siparis-card-text">
            <i className="icon-shopping-bag">
              Toplam Ücret:
              {parseInt(props.siparis.ucret)+(parseInt(props.siparis.ucret)>=250 || props.siparis.paket ? 0 : 15)+(props.siparis.odeme==='kapıda' ? 10 : 0)} ₺
            </i>
          </h3>
          <Message type={props.siparis.odeme ===  'kapıda' ? 'warning' : 'success'} description={props.siparis.odeme==='kapıda' ? ' Kapıda '+props.siparis.kapida+' ödeme seçildi' : 'Havale İle Ödeme Seçildi'} />

          <br/>
          <Button circular  size='tiny' icon='trash' onClick={()=>Sildirici(true)}/>
          <Header as='h3' dividing>
            Ürünler
          </Header>
          {urunView(props.siparis.Urunler)}

        </Panel>
        <br/><br/>
        <Sildir/>
      </Col>
    )
  )
}
export default SiparisKart
