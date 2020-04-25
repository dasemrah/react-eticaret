import React from "react";
import {Message} from "rsuite";
import {Icon, Image} from 'evergreen-ui'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const Nasıl =()=>
  <div>
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<Icon icon='shopping-cart' size={16}/>}
      >
        <br/>
        <h3 className="vertical-timeline-element-title "><span>Sepete Ekleyin</span></h3>
        <br/>
        <p>Sipariş vermek istediğiniz ürünü "Sepete Ekle" butonu ile alışveriş sepetinize ekleyebilirsiniz.</p>
        <br/>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        contentStyle={{ background: '#FFC26B', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #FFC26B' }}
        className="vertical-timeline-element--work"
        iconStyle={{ background: '#FFC26B', color: '#fff' }}
        icon={<Icon icon='plus' size={16}/>}

      >
        <br/>
        <h3 className="vertical-timeline-element-title">Ürün Miktarını Belirleyin</h3>
        <br/>
        <p className="text-dark">
          Üst kısımdaki sepet butonuna basarak sepetinizi açın. Seçtiğiniz ürünlerin hemen altında ürün miktarını görebilir,
          ürün miktarını artırıp azaltabilirsiniz.
        </p>
        <br/>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: '#4FFF62', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #4FFF62' }}
        iconStyle={{ background: '#4FFF62', color: '#fff' }}
        icon={<Icon icon='tick' size={16}/>}
      >
        <br/>
        <h3 className="vertical-timeline-element-title">Sepeti Onaylayın</h3>
        <br/>
        <p className="text-dark">
          Satın alacağınız ürünleri belirledikten sonra, sepetinizin alt kısmındaki "Sepeti Onayla" butonuna basarak alışveriş işleminizi
          bitirebilirsiniz.
        </p>
        <br/>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        iconStyle={{ background: '#4FF4FF', color: '#fff' }}
        icon={<Icon icon='user' size={16} />}
        contentStyle={{ background: '#4FF4FF', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #4FF4FF' }}
      >
        <br/>
        <h3 className="vertical-timeline-element-title">Bilgilerinizi girin</h3>
        <br/>
        <p className='text-dark'>
         Sepetinizi onayladıktan sonra açılan sipariş ekranında kişisel bilgilerinizi ve kargonuzun teslimat adresini
          giriniz.
        </p>
        <br/>
      </VerticalTimelineElement>

      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        iconStyle={{ background: '#995AF3', color: '#fff' }}
        icon={<Icon icon='credit-card' size={16}/>}
        contentStyle={{ background: '#995AF3', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #995AF3' }}
      >
        <br/>
        <h3 className="vertical-timeline-element-title">Ödeme Yöntemini Seçin</h3>
        <br/>
        <p>
          Teslimat bilgilerini girdikten sonra ödeme adımı için ilerleyin. Ödeme adımında tercih ettiğiniz ödeme yöntemini seçin.
        </p>
        <br/>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        iconStyle={{ background: '#FF7373', color: '#fff' }}
        contentStyle={{ background: '#FF7373', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  #FF7373' }}
        icon={<Icon icon='small-tick' size={16}/>}
      >
        <br/>
        <h3 className="vertical-timeline-element-title">Siparişinizi Tamamlayın</h3>
        <br/>
        <p>
          Ödeme adımında EFT / Havale ile ödemeyi seçtiyseniz ekranda çıkan banka hesabına sipariş ücretini ödedikten sonra
          iletişim adresimizden bize bildirmeyi unutmayın. Daha sonra ürünleriniz hazırlanarak kargo ile adresinize
          gönderilecektir.
        </p>
        <br/>
      </VerticalTimelineElement>

    </VerticalTimeline>
  </div>

export default Nasıl
