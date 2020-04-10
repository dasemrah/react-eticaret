import Carousel from "react-multi-carousel";
import Urunler from "../Main/Urunler";
import {Col} from "reactstrap";
import React from "react";
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
const Kaydırak=props=>(
  <Carousel
    swipeable={true}
    draggable={true}
    showDots={true}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    containerClass="kaydırak"
  >
    {props.urunler.map(urun=>
      <div key={urun._id}>

        <Urunler sepeteEkle={props.sepeteEkle} urunAç={props.urunAç} urun={urun}/>

      </div>

    )}
  </Carousel>
)
export default Kaydırak
