import React,{Component} from 'react'
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {Card, Badge, CardBody, CardHeader, Spinner} from "reactstrap";
import {Line} from "react-chartjs-2";
import Urun from "../Urunler/Urun";
import api from "../../../istek";


const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}
class AylikGrafik extends Component{
  constructor(props) {
    super(props);
    this.state={
      load:false,
      grafikayı:'',
      aylıktoplam:0,
      tarih:[],
      veri:{
        labels: [],
        datasets: [
          {
            data: [],
            label: 'Kazanç ₺',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 8,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 10,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      }
    }
  }
  loading = () =>   <Spinner style={{ width: '24rem', height: '24rem' }} type="grow" color="warning" />;
  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps)
    this.state.veri.datasets[0].data=[]
    this.state.veri.labels=[]
    var ayliktoplam=0;
    nextProps.data.map(eleman=> {
      var tl = 0;
      eleman.aradizi.map(gun=>{
        console.log('ücret:-->',gun.ucret)
         if(!isNaN(parseInt(gun.ucret))){ tl = tl + parseInt(gun.ucret)}
      })

      ayliktoplam=ayliktoplam+tl
      this.state.veri.datasets[0].data.push(tl);
      this.state.veri.labels.push(eleman.tarih.slice(0,10))
    })
   if(nextProps.data.length>0){ this.setState({aylıktoplam:ayliktoplam,grafikayı:nextProps.data[nextProps.data.length-1].tarih.slice(0,7)})}
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextProps.data.length>0||nextState.aylıktoplam>0)
  }
  render() {
    return(
      <div className="animated fadeIn">

        <Card className="aylik-grafik">

                <CardHeader>
                  <h3 className="text-center">
                    <Badge color="danger">Ay: {this.state.grafikayı}</Badge>
                    <Badge color="warning">Toplam: {this.state.aylıktoplam} ₺</Badge>
                    <Badge color="light">Günlük Ortalama: {parseInt(this.state.aylıktoplam/this.state.veri.labels.length)} ₺</Badge>
                  </h3>
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={this.state.veri} options={options} />
                  </div>
                </CardBody>

        </Card>
      </div>
    )
  }

}
export default AylikGrafik;
