import React from "react";
import {Button, Jumbotron} from 'reactstrap'
import {Alert} from "evergreen-ui";
export default ()=>
  <>
    <Jumbotron>
      <Alert
        intent="success"
        title="Siparişinizi aldık. Ödeme işlemini yaptıktan sonra bize haber vermeyi unutmayın."
        marginBottom={32}
      />
      <Button onClick={()=>{ window.location.hash = "#/sorgula"}} className="btn-success">Sipariş Kontrol Sayfasına Git<i className="icon-rocket"> </i></Button>
    </Jumbotron>
  </>
