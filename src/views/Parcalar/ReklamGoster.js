import React,{useState,useEffect} from 'react'
import istek from '../../istek'
import {Col,Row} from 'reactstrap'
import {List,Image} from "semantic-ui-react";
import Carousel from 'react-multi-carousel';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
  const veri=[
    {
      img:'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=631&q=80',
      link:'/nasil',
      başlık:'Nasıl',
      açıklama:'Sipariş verebilirim?'
    },
    {
      img:'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80',
      link:'/paketleme',
      başlık:'Nasıl',
      açıklama:'Paketleme Yapıyoruz?'
    },
    {
      img:'https://images.unsplash.com/photo-1543264228-460e284028a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=348&q=80',
      link:'/heybe',
      başlık:'Şifa',
      açıklama:'Dolu Heybe'
    }
  ]
const ReklamGoster=props=>{

    return(


       <Carousel
         swipeable={true}
         draggable={true}
         showDots={true}
         responsive={responsive}
         ssr={true} // means to render carousel on server-side.
         infinite={true}
         autoPlay={true}
         autoPlaySpeed={2500}
         keyBoardControl={true}
         containerClass="kaydırak"
         removeArrowOnDeviceType={["tablet", "mobile"]}
         dotListClass="custom-dot-list-style"
         itemClass="carousel-item-padding-40-px"
       >
         {veri.map(e=>
          <div key={e._id}>
            <List divided verticalAlign="middle">
              <List.Item onClick={()=>props.history.push(e.link)}>
                <Image className="nasıl" centered src={e.img}/>
                <List.Content className="text-block">
                  <List.Header as="a"><span className="text-light text-uppercase">{e.başlık}</span></List.Header>
                  <p className="text-light text-uppercase">{e.açıklama}</p>
                </List.Content>
              </List.Item>
            </List>
          </div>
         )}

       </Carousel>


    )
}
export default ReklamGoster
