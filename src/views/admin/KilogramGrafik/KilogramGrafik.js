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
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2455E0',
            pointBackgroundColor: '#2455E0',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
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
                  <Line width={'100%'} height={600} data={this.state.veri} options={options}/>
        </Panel>
      </div>
    )
  }
}
export default KilogramGrafik
