import React, {useEffect, useState} from "react";
import {Panel, IconButton, Table, Icon, Drawer, Button} from "rsuite";
import {Label} from "semantic-ui-react";
import Edit from "./Edit";
const { Column, HeaderCell, Cell, Pagination } = Table;

const urunView =(urunler)=>(
  <Table
    autoHeight
    data={urunler}
    onRowClick={data => {
      console.log(data);
    }}
  >
    <Column width={200}>
      <HeaderCell>Ürün</HeaderCell>
      <Cell>
        {siparis => (
          <>{siparis.ad || siparis.urun?.ad}</>
        )
        }
      </Cell>
    </Column>
    <Column width={75}>
      <HeaderCell>Miktar</HeaderCell>
      <Cell>
        {siparis => (
          <>{siparis.miktar || siparis.kg}</>
        )
        }
      </Cell>
    </Column>
    <Column width={125}>
      <HeaderCell>Net</HeaderCell>
      <Cell dataKey="net" />
    </Column>


  </Table>
)

const SiparisKart=props=>{
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    console.log('width:-->',windowDimensions)
  },[]);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  const setPosition= () => (
    windowDimensions.width > 767 ? 'right' : 'bottom'
  )
  const setSize = () => (
    windowDimensions.width > 767 ? 'md' : 'sm'
  )


  const {siparis} = props


  const siparisGoster=(
    <Panel className="siparis_layout" style={{backgroundColor:'white'}} shaded>
      <div className="detay">
        <div>Ad Soyad: <span>{siparis.ad}</span></div>
        <div>Telefon: <span>  <a target="_blank" href={'http://wa.me/'+siparis?.telefon?.substring(1,siparis?.telefon?.length)}>{siparis.telefon} </a> </span></div>
        <div>Tarih: <span>{siparis?.tarih?.substring(0,10)}</span></div>
        <div>Ödeme Türü:
          <span>
                {
                  siparis.odeme === 'havale' ?
                    <Label size='mini' color='teal'>Havale</Label>
                    :siparis.odeme === 'kapıda' ?
                    <Label size='mini'>Kapıda {siparis.kapida === 'nakit' ?
                      <Label size='mini' color='green'>nakit</Label> : <Label color='yellow' size='mini'>kartla</Label>}
                    </Label>
                    :null
                }
              </span>
        </div>
        <div>Toplam Ücret: <span>{parseInt(siparis.ucret)+(siparis.odeme==='havale' ? 15 : 25) }₺</span></div>
      </div>
      <div className="orta">
        <div>
          <div className="bolum">
            <h3>Teslimat Adresi</h3>
            <span>{siparis.adres}</span>
          </div>
          {
            siparis?.detay?.length > 0 ?
              <div className="bolum">
                <h4>Sipariş Notu</h4>
                <span>{siparis.detay}</span>
              </div>
              :null
          }

          <div className="cost">
            <div>Ara Toplam <div>{siparis.ucret}₺</div></div>
            {
              siparis.odeme === 'kapıda' ?
                <div>Kapıda Ödeme Ücreti <div>+25₺</div></div>
                :<div>kargo Ücreti <div>+15₺</div></div>
            }
            <div>Toplam Ücret <div>{parseInt(siparis.ucret)+(siparis.odeme==='havale' ? 15 : 25)}₺</div></div>
          </div>

        </div>
      </div>
      <Panel className="siparis_urun_tablo" header='Ürünler' collapsible>
        {urunView(siparis.Urunler)}
      </Panel>
    </Panel>
  )

  return(
    <Drawer
      className="siparis_kart"
      show={props.show}
      size={setSize()}
      onHide={() => props.kapat()}
    >
      <Drawer.Header>
        <Drawer.Title>
          {
            !props.editor ?
              <>
                Sipariş detayı
              </>
              :
              <>
                Siparişi düzenle
              </>
          }
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {
          props.editor ?
            <Edit {...props} siparis={siparis}/>
            :
            <>
              {siparisGoster}
            </>
        }
      </Drawer.Body>
      <Drawer.Footer>
            <IconButton color={ !props.editor ? 'orange': 'red'} onClick={!props.editor ? () => props.duzenle() : ()=> props.onizle()}  placement='right' icon={<Icon icon={!props.editor ? 'edit': 'ban'}/>}>
              {
                !props.editor ?
                  <>Düzenle</>
                  :
                  <>İptal</>
              }
            </IconButton>
        <IconButton onClick={() => props.kapat()} circle color='red' icon={<Icon icon='close'/>} />
      </Drawer.Footer>
    </Drawer>
  )
}
export default SiparisKart
