import React,{Component} from 'react';
import { Pie,Line ,Bar} from 'react-chartjs-2';
import {Card, CardBody, CardHeader} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {Panel} from "rsuite";
var newData=[]

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}
class KilogramGrafik extends Component{
  constructor(props){
    super(props)
    this.state={
      veri:{
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Adet',
            backgroundColor: '#FFB957',
            borderColor: '#FFB957',
            borderWidth: 1,
            hoverBackgroundColor: '#AF6600',
            hoverBorderColor: '#AF6600',
          },
        ],
      }
      }

  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.state.veri.labels=[]
    this.state.veri.datasets[0].data=[]
    var data=[]
    nextProps.data.map(e=>{
      this.state.veri.labels.push(e.urun.ad);
      this.state.veri.datasets[0].data.push(e.miktar)
    },


    )

}

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return(nextProps.data.length>0)
  }

  render() {
    return(
      <div className="animated fadeIn">

        <Panel  header='Ürünler Kaç Adet Satılmış'>
                  <Bar width={'100%'} height={600} data={this.state.veri} options={options}/>
        </Panel>
      </div>
    )
  }
}
export default KilogramGrafik
