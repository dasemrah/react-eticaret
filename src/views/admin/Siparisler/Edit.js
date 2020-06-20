import React, {useState, useEffect} from "react";
import {Modal, ButtonToolbar, Button} from 'rsuite'
const Edit = props => {
  useEffect( () => {
    console.log('edit props--->',props)
  })

  return(
    <div className="edit_bolgesi">
      <Modal
        onHide={()=>props.kapat()}
        show={props.show}

      >
        <Modal.Header>
          <Modal.Title>Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          düzenle
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.kapat()} appearance="subtle">
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default Edit
