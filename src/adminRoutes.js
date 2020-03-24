import React from 'react';
const Dashboard = React.lazy(() => import('./views/admin/Dashboard'));
const Login = React.lazy(()=>import('./views/Pages/Login'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Urunler = React.lazy(()=>import('./views/admin/Urunler'));
const Siparisler = React.lazy(()=>import('./views/admin/Siparisler'));
const Urunekle = React.lazy(()=>import('./views/Pages/Urunekle'));
const FotoEkle = React.lazy(()=>import('./views/Pages/FotoEkle'));
const Reklam   = React.lazy(()=>import('./views/admin/Reklam'));


const adminRoutes = [
  { path: '/', exact: true, name: 'Ana Sayfa' ,component: Dashboard },
  { path: '/urunler', exact: true, name: 'Ürünler' ,component: Urunler },
  { path: '/urunekle', exact: true, name: 'Ürün Ekle' ,component: Urunekle },
  { path: '/siparisler', exact: true, name: 'Siparişler' ,component: Siparisler },
  { path: '/login'   ,name:'Login', component:Login},
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/fotoekle', exact: true, name: 'Fotoğraf Ekle', component: FotoEkle },
  { path: '/reklam', exact: true, name: 'Reklam Görseli Yükle', component: Reklam }
];

export default adminRoutes;
