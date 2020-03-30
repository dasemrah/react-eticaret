import React from "react";
import {Button, Jumbotron} from 'reactstrap'
import {Alert} from "evergreen-ui";
const SiparişTamam =props=>{
  let urunler=props.s.Urunler.map(urun=>{return  String(urun.net)+' kg '+String(urun.ad)+' '})
  let mesaj="Sayın "+ props.s.ad+" "+ urunler+ 'siparişiniz başarıyla kaydedildi. TOPLAM ÖDEMENİZ GEREKEN ÜCRET: ' +props.s.ucret+'₺  Ödemenizi yaptığınızda ürünü hazırlayıp kargoya veriyoruz. Ödemenizi aşağıdaki hesaba yaptıktan sonra  +905432196263 numaralı telefona mesaj atarak bize haber veriniz. \\n IBAN NO: IBAN_NUMARASI HESAP_ADI ';
  return(
    <Jumbotron className="text-center">
      <Alert
        intent="success"
        title="Siparişiniz Kaydedildi"
        marginBottom={32}
      />
      <p className="text-left text-dark">{mesaj}</p>
      <Button onClick={()=>{ window.location.hash = "#/sorgula"}} className="btn-success">Sipariş Kontrol Sayfasına Git<i className="icon-rocket"> </i></Button>

    </Jumbotron>
  )
}
export default SiparişTamam
