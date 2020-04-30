import React, { Component, } from 'react';
import Siparis from './Siparis'
class Siparisler extends Component {
  constructor(props){
    super(props)
    this.state={
      tumsiparisler:[]
    }

  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
          <>
            {

                <Siparis {...this.props}/>

            }
          </>
      </div>
    );
  }
}

export default Siparisler;

