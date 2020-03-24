import React,{useState} from 'react';
import ImageUploader from "react-images-upload";
import {Card,Row,Col,CardBody,Input,CardHeader,InputGroup,InputGroupText,InputGroupAddon} from "reactstrap";
import {Alert} from "evergreen-ui";
import istek from "../../../istek";
import {Button} from 'semantic-ui-react';
import axios from "axios";
const FotoEkle=()=>{
const [fotolar,uygFoto] = useState({file:''});
const [ulr, uygUrl]     = useState("")
const [başarılı, uygBaşarılı]     = useState(false);
const [yükleniyor,uygYükleniyor]  = useState(false)
const [açıklama,uygAçıklama]  = useState("")
  const gorselSec=picture=>{
    uygFoto(picture)
    uygUrl("")
    uygBaşarılı(false)
    console.log(fotolar)
  }
  const gonderGitsin = (ev) => {
    uygYükleniyor(true)
    console.log('Resimler:---->',fotolar);
    let file = fotolar[0];
    // Split the filename to get the name and type
    let fileName = file.name;
    let fileType = file.type;
    console.log("Preparing the upload");
    istek.post('/sign',{
      fileName : fileName,
      fileType : fileType
    })
      .then(response => {
        var returnData = response.data.data.returnData;
        console.log('return data: ',response.data)
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        uygUrl(url)
        console.log("Recieved a signed request " + signedRequest);

        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'Content-Type': fileType
          }
        };
        axios.put(signedRequest,file,options)
          .then(result => {
            console.log("Response from s3")
            console.log(result)

            let fileUrl=result.config.url.slice(0,result.config.url.indexOf('?'))
            console.log('Dosya adresi: ',fileUrl);

            uygUrl(fileUrl)
            istek
              .post('/yenislayt',{
                url:url,
                text:açıklama
              })
              .then(ynt=>{
                console.log(ynt)
                uygYükleniyor(false)
                uygBaşarılı(true)
              })
              .catch(err=>console.log(err))
          })

          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return(
    <>
      <Card>
       <CardHeader><span className="h3 text-uppercase text-muted text-center">Fotoğraf Yükle</span></CardHeader>
     <CardBody>
       <Row>
         {
           başarılı
             ?
             <Col xs="12">
               <Alert
                 intent="success"
                 title="Fotoğraf Eklendi"
                 marginBottom={32}
               />
               <img className="img-thumbnail" src={ulr} alt=""/>
             </Col>
             :
             <>
               <Col xs="12">
                 <InputGroup>
                   <InputGroupAddon addonType="prepend">
                     <InputGroupText>
                       <i className="icon-tag"> </i>
                     </InputGroupText>
                   </InputGroupAddon>
                   <Input type="text" placeHolder="Açıklama Girin" onChange={e=>uygAçıklama(e.target.value)} value={açıklama}/>
                 </InputGroup>
               </Col>
             <Col xs="12">
               <ImageUploader
                 withIcon={true}
                 buttonText='Görsel Seç'
                 onChange={gorselSec}
                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
                 label="Maksimum görsel boytu 5mb olmalı .jpg, .gif, .png, .gif"
                 withPreview={true}
                 maxFileSize={5242880}
                 withLabel={true}
                 fileSizeError="Görsel Boyutu Çok Büyük"
                 singleImage={true}
               />

             </Col>
               <Col xs="12">
                 <Button
                   positive
                   content={yükleniyor ? <>Yükleniyor</>:<>Yükle</>}
                   icon='right arrow'
                   labelPosition='right'
                   onClick={gonderGitsin}/>
               </Col>
             </>
         }
       </Row>
     </CardBody>
      </Card>
    </>
  )
}
export default FotoEkle


