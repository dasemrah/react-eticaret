import React,{Component} from 'react';
import { Bar} from 'react-chartjs-2';
import {Panel} from "rsuite";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
var newData=[]

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}
class KazancGrafik extends Component{
  constructor(props) {
    super(props)
    this.state = {
      veri: {
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Ücret ₺',
            backgroundColor: '#59afff',
            borderColor: '#59afff',
            borderWidth: 1,
            hoverBackgroundColor: '#0a5dc2',
            hoverBorderColor: '#0a5dc2',
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
        this.state.veri.datasets[0].data.push(e.miktar*e.urun.fiyat)
      },

    )

  }


  render() {
    return(
    <Panel  header="Ürün başı kazanç">
      <Bar height={600} data={this.state.veri} options={options} />
    </Panel>
    )
  }
}
export default KazancGrafik
