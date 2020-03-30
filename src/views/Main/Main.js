import React from 'react';
import Urunler from "./Urunler";
import {Row,Col} from "reactstrap";
import api from "../../istek";
import Slayt from "./Slayt";
import {Image, Loader, Header} from 'semantic-ui-react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReklamGoster from "../Parcalar/ReklamGoster";
import Istatistik from "../Parcalar/Istatistik";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
};

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      kategori:[],
      items:[],
      kategoriler:[],
      urunler:[]
    }
    console.log('ana sayfa verileri',this.props)
    console.log('ana sayfa path',window.location.pathname)
  }


  componentDidMount() {

    api.get('/slayt')
      .then((foundItems)=>{
        this.setState({
          items:foundItems.data
        })
      })
  }



  componentWillReceiveProps(nextProps, nextContext) {
    console.log('ana menu---->',nextProps)
    this.setState({
      kategoriler:nextProps.kategoriler,
      kategori:nextProps.kategori,
      urunler:nextProps.urunler,

    })
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('ana state',nextState)
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return(nextProps.kategoriler.length>0)
  }

  render() {

  const Yukleyici=()=> <Loader size="big" active inline='centered' />
    return(

      <div className="ana_sayfa">
        <Row>
             <Col xs="12">
               <div className="slayt_dış"> <Slayt gorseller={this.state.items}/></div>
             </Col>
              <Col xs="12">
                <Istatistik/>
              </Col>
              <Col xs="12">
                <br/>
                <ReklamGoster {...this.props}/>
              </Col>
              <Col xs="12">
                <br/><br/>
                <Header className="kategori_adi" dividing>
                  En Popüler Ürünler
                </Header>
                   <br/><br/>
                  <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  containerClass="kaydırak"
                  >
                  {this.state.urunler.map(urun=>
                    <div key={urun._id}>

                      <Urunler sepeteEkle={this.props.sepeteEkle} urunAç={this.props.urunAç} urun={urun}/>

                    </div>

                  )}
                  </Carousel>
              </Col>
         </Row>
      </div>
    )
  }
}
export default Main;
