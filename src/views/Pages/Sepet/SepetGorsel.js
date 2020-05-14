import React, {useState, useEffect} from "react";
import api from "../../../istek";
import {Image} from "semantic-ui-react";

const SepetGorsel = props => {
  useEffect(()=>{
    console.log('sepet görseli',props.urun.gorsel)
    api
      .post('gorselver',{gorselID:props.urun.gorsel})
      .then(cvp=>{
        console.log('cvp', cvp.data.img)
        Gorsel(cvp.data.img.data)
      })
  },[])
  const [gorsel, Gorsel ] = useState('')
return(
  <>
    <Image onClick={()=>props.urunAç(props.urun)} size='mini' src={gorsel} className="sepet_gorsel" alt=""/>
  </>
)
}
export default SepetGorsel
