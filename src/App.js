import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import './App.scss';
import 'semantic-ui-css/semantic.min.css'
import 'rsuite/dist/styles/rsuite-default.css';
import {Spinner} from "reactstrap";
import istek from "./istek";
import Disk from 'o.disk'
const loading = () =><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" size="lg" />
// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

class App extends Component {
   constructor(props) {
     super(props)
   }
   componentDidMount() {
     istek
       .get('/user')
       .then(ynt => {
         console.log('yönetici-->',ynt)
         if(ynt.data.status === 1){
           Disk.kullanıcı=ynt.data.user
         }else Disk.kullanıcı=null
       })
   }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
             <PrintProvider>
               <NoPrint>
                 <Route path="/" name="Home" component={DefaultLayout} />
               </NoPrint>
             </PrintProvider>
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
