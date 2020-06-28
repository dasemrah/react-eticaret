import React, {useState, useEffect} from "react";
import {SelectPicker, Panel, Input, Table, IconButton , Icon} from 'rsuite'

const { Column, HeaderCell, Cell, Pagination } = Table;

const Edit = props => {
  useEffect( () => {
    console.log('edit props--->',props)
  },[])
  const {siparis} = props
  const [data, setData] = useState(siparis);
  const handleChange = (key, value) => {
    const nextData = Object.assign([], data);
    nextData[key] = value
    setData(nextData);
    console.log('data-->',data)
  };
  const odeme=[
    {
      "label": "Kapıda",
      "value": "kapıda",
      "role": "Master"
    },
    {
      "label": "Havale",
      "value": "havale",
      "role": "Master"
    },
  ]
  const kapıda=[
    {
      "label": "Kartla",
      "value": "kartla",
      "role": "Master"
    },
    {
      "label": "Nakit",
      "value": "nakit",
      "role": "Master"
    },
  ]
  const Action=({ rowData, dataKey, ...props })=> {
   console.log('rowdata-->',rowData, 'datakey-->',dataKey)
    return(
      <div>dsa</div>
    )
  }
  return(
    <Panel className="edit_bolgesi">
      <span>Ad Soyad</span>
      <Input
        value={data.ad}
        onChange={e => handleChange( 'ad', e)}
      />
      <span>Telefon</span>
      <Input
        value={data.telefon}
        onChange={e => handleChange('telefon',e)}
      />
      <span>Adres</span>
      <Input
        value={data.adres}
        componentClass="textarea"
        onChange={e => handleChange('adres',e)}
        style={{ resize: 'auto' }}
      />
      <span>Detay</span>
      <Input
        value={data.detay}
        componentClass="textarea"
        onChange={e => handleChange('detay',e)}
        style={{ resize: 'auto' }}
      />
      <Panel style={{backgroundColor:'white'}} collapsible shaded header='Ödeme yöntemi değiştir' className="seciciler">
        <span>Ödeme Türü</span>
        <SelectPicker
          data={odeme}
          appearance="subtle"
          placeholder={data.odeme}
          onChange={e => handleChange('odeme',e)}
        />
        {
          data.odeme === 'kapıda' ?
            <div>
              <span>Kapıda ödeme seçeneği</span>
              <SelectPicker
                data={kapıda}
                appearance="subtle"
                placeholder={data.kapida}
                onChange={e => handleChange('kapida',e)}
              />
            </div>
            :null
        }
      </Panel>

        <Panel style={{marginBottom:'20px',backgroundColor:'white'}} header='Ürünler' collapsible shaded>
          <Table
            data={data.Urunler}
            onSortColumn={(sortColumn, sortType) => {
              console.log(sortColumn, sortType);
            }}
          >
            <Column flexGrow={1}>
              <HeaderCell>Ad</HeaderCell>
              <Cell dataKey="ad" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Miktar</HeaderCell>
              <Cell dataKey="miktar" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Fiyat</HeaderCell>
              <Cell dataKey="fiyat" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Net</HeaderCell>
              <Cell dataKey="net" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Action</HeaderCell>
              <Action dataKey="id" />
            </Column>
          </Table>
        </Panel>
      <IconButton size='lg' color='green' icon={<Icon icon='check-circle-o' />} placement='right' onClick={()=>props.guncelle(data)}>
        Kaydet
      </IconButton>
    </Panel>
  )
}
export default Edit
