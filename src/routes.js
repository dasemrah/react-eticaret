import React from 'react';
const Login       =  React.lazy(()=>import('./views/Pages/Login'));
const Kayıt       =  React.lazy(()=>import('./views/Pages/Register'));
const Main        =  React.lazy(()=>import('./views/Main'));
const Sorgula     =  React.lazy(()=>import('./views/Main/Sorgula'));

const Siparis     =  React.lazy(()=>import('./views/Pages/Sepet/Sipariş.js'));
const Kategoriler =  React.lazy(()=>import('./views/Pages/Kategoriler'));
const Nasıl       =  React.lazy(()=>import('./views/Ekler/Nasıl'));
const Heybe       =  React.lazy(()=>import('./views/Ekler/Heybe'));
const Paketleme   =  React.lazy(()=>import('./views/Ekler/Paketleme'));
const Hikaye      =  React.lazy(()=>import('./views/Ekler/Hikayemiz'));
const Gizlilik    =  React.lazy(()=>import('./views/Ekler/Gizlilik'));
const BegeniSayfası    =  React.lazy(()=>import('./views/Pages/Begeni'));
const routes      = [

  { path: '/',              exact: true,            name: 'Ana Sayfa' , component: Main },
  { path: '/sorgula',       exact: true,            name: 'Sorgula' ,   component: Sorgula },
  { path: '/login',         name: 'Login',                              component:  Login},
  { path: '/siparis',       name: 'Yeni Sipariş',                       component:  Siparis},
  { path: '/kategori',      name: 'Kategori',                           component:  Kategoriler},
  { path: '/nasil',         name: 'Nasıl Sipariş Verebilirim',          component:  Nasıl},
  { path: '/heybe',         name: 'Şifa Dolu Heybe',                    component:  Heybe},
  { path: '/paketleme',     name: 'Nasıl Paketleme Yapıyoruz?',         component:  Paketleme},
  { path: '/hikaye',        name: 'Hikayemiz',                          component:  Hikaye},
  { path: '/gizlilik',      name: 'Gizlilik ve Sözlleşme',              component:  Gizlilik},
  { path: '/begen',        name: 'Beğendiklerim',                      component:  BegeniSayfası},
];

export default routes;
