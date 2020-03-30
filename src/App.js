import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import istek from './istek';
import './App.scss';
import 'semantic-ui-css/semantic.min.css'
import {Spinner} from "reactstrap";
const loading = () =><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" size="lg" />
// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

class App extends Component {
   constructor(props) {
     super(props)
   }
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
