import React from "react";
import {IconButton, Icon} from "rsuite";

const DefaultFooter = props => {
  return(
    <div>

      <div className="social">
        <h4>Sosyal Medya</h4>
        <a target="_blank" href="https://www.instagram.com/yoreselgida_pazari/">
          <IconButton
            color="red"
            circle size={"lg"}
            icon={<Icon icon='instagram' />}
          />
        </a>
        <a target="_blank" href="https://wa.me/+905432196263">
          <IconButton
            color="cyan"
            circle
            size={"lg"}
            icon={<Icon icon='whatsapp' />}
          />
        </a>
      </div>

      <div className="marka">
        <span> Nazlı Köy </span>
        ©2020

      </div>

      <div className="linkler">
        <a onClick={() => props.history.push('/gizlilik')}>Gizlilik ve Çerez Politikası</a>
     </div>

    </div>
  )
}
export default DefaultFooter
