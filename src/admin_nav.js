export default {
  items: [
    {
      name: 'Ana Sayfa',
      url: '/dashboard',
      icon: 'icon-home',
      badge: {
        variant: 'info',
      },
    },

        {
          name: 'Ana Ekrana Fotoğraf Ekle',
          url: '/fotoekle',
          icon: 'icon-camera',
        },
        {
          name: 'Reklam Ekle',
          url: '/reklam',
          icon: 'icon-tag',
        },
        {
          name:'Ürün Ekle',
          url:"/urunekle",
          icon:'icon-plus'
        },
        {
          name:'Siparisler',
          url:"/siparisler",
          icon:"icon-pie-chart"
        },
        {
          name:'Urunler',
          url:'/urunler',
          icon:'icon-bag'
        },
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-user',
        },

        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        }
  ],
};
