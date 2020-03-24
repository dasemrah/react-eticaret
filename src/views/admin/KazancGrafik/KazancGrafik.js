import React,{Component} from 'react';
import { Doughnut} from 'react-chartjs-2';
import { Card, CardBody, CardHeader } from 'reactstrap';
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
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#006F54',
              '#008691',
              '#FFE6FF',
              '#D3FF00',
              '#F0F4CD',
              '#00F5FF',
              '#FFC89D',
              '#EF005F',
              '#2F4858',
              '#B859E7',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#006F54',
              '#008691',
              '#FFE6FF',
              '#D3FF00',
              '#F0F4CD',
              '#00F5FF',
              '#FFC89D',
              '#EF005F',
              '#2F4858',
              '#B859E7',
            ],
          }],
      }

    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.state.veri.labels=[]
    this.state.veri.datasets[0].data=[]
    var data=[]
    nextProps.data.map(e=>{
        console.log('kazanç graifği ürün--->',e)
        this.state.veri.labels.push(e.urun.ad);
        this.state.veri.datasets[0].data.push(e.miktar*e.urun.fiyat)
      },

    )

  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return(nextState.veri.labels.length>0)
  }


  render() {
    return(
      <div className="animated fadeIn">

        <Card className="graik_kart">
          <CardHeader>
            Her Üründen Kazanılan Ücret (₺)
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              <Doughnut data={this.state.veri} options={options} />
            </div>
          </CardBody>

        </Card>
      </div>
    )
  }
}
export default KazancGrafik
