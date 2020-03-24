import React,{useState,useEffect} from 'react'
import istek from '../../istek'
import {Col,Row} from 'reactstrap'
export default ()=>{
  const [gorselller,setGorseller] = useState([])
  useEffect(()=>{
    istek
      .get('/reklamlar')
      .then(ynt=>{
        console.log('gelen reklamlar',ynt.data)
        setGorseller(ynt.data)
      })
      .catch(err=>console.log(err))
  },[])
    return(
      <Row>
          {gorselller.map(gorsel=>
             <Col key={gorsel._id} xs="6">
               <img className="gorss" src={gorsel.img} alt=""/>
             </Col>
          )}
      </Row>
    )
}
