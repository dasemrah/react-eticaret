import React from "react";
import {Header,Container,Segment} from "semantic-ui-react";
import sözleşme from "./veri";
export default ()=>
  <Container>
    <Header as='h2' textAlign='center' block dividing color='black'>
      GİZLİLİK VE GÜVENLİK POLİTİKASI
    </Header>
    <Segment>
      {sözleşme}
    </Segment>
  </Container>
