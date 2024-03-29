import React,{Component} from 'react'
import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {Card, Col, Spinner} from "reactstrap";
import {Line} from "react-chartjs-2";
import {List, Label, Button, Icon} from 'semantic-ui-react'
import {Panel} from "rsuite";


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
            fill: true,
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

    this.state.veri.datasets[0].data=[]
    this.state.veri.labels=[]
    var ayliktoplam=0;
    nextProps.data.map(eleman=> {
      var tl = 0;
      eleman.aradizi.map(gun=>{

         if(!isNaN(parseInt(gun.ucret))){ tl = tl + parseInt(gun.ucret)}
      })

      ayliktoplam=ayliktoplam+tl
      this.state.veri.datasets[0].data.push(tl);
      this.state.veri.labels.push(eleman.tarih.slice(5,10))
    })
   if(nextProps.data.length>0){
     this.setState({
       aylıktoplam:ayliktoplam,
       grafikayı:nextProps.data[nextProps.data.length-1].tarih.slice(0,7)
     })
   }
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextProps.data.length>0||nextState.aylıktoplam>0)
  }
  render() {
    return(
      <>
        <Panel>
          <List>
            <List.Item>
              <List.Content floated='right'>
                {this.state.grafikayı}
              </List.Content>
              <List.Content>Gösterilen Ay: </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                {this.state.aylıktoplam} ₺
              </List.Content>
              <List.Content>Bu ayki toplam kazanç: </List.Content>
            </List.Item>
            <List.Item>
              <List.Content floated='right'>
                {parseInt(this.state.aylıktoplam/this.state.veri.labels.length)} ₺
              </List.Content>
              <List.Content>Günlük ortalama kazanç: </List.Content>
            </List.Item>
          </List>
          <Button content='Önceki ay' size='mini' icon='left arrow' labelPosition='left'   onClick={()=>this.props.sonraki(1)}/>
          <Button content='Sonraki ay' floated='right' size='mini' icon='right arrow' labelPosition='right'  onClick={()=>this.props.sonraki(-1)}/>


        </Panel>

            <Line width={'120%'} data={this.state.veri} options={options} />

      </>
    )
  }

}
export default AylikGrafik;
