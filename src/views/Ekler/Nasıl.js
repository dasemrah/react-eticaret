import React,{useEffect,useState} from "react";
import {Header} from "semantic-ui-react";
import {Table} from 'evergreen-ui'

const Nasıl = props=>{
  const [urunler,setUrun]=useState([])
  useEffect(()=>{
    props.kategoriler.map(kat=>{
      kat.urunler.map(urun=>{
        setUrun([...urunler,urun])
      })
    })
    console.log('gelen ürünler',urunler)
  },[])
  return(
    <>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell />
          <Table.TextHeaderCell>
            Last Activity
          </Table.TextHeaderCell>
          <Table.TextHeaderCell>
            ltv
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {urunler.map(urun => (
            <Table.Row key={urun._id} isSelectable onSelect={() => alert(urun.ad)}>
              <Table.TextCell>{urun.ad}</Table.TextCell>
              <Table.TextCell>{urun.fiyat}</Table.TextCell>
              <Table.TextCell isNumber>
                {urun.aciklama}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default Nasıl
