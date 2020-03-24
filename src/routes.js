import React from 'react';
const Login = React.lazy(()=>import('./views/Pages/Login'));
const Kayıt = React.lazy(()=>import('./views/Pages/Register'));
const Main = React.lazy(()=>import('./views/Main'));
const Sorgula=React.lazy(()=>import('./views/Main/Sorgula'))
const UrunSayfası =React.lazy(()=>import('./views/Main/Urunler/Urun'))
const Siparis  = React.lazy(()=>import('./views/Pages/Sepet/Sipariş.js'))
const Kategoriler=React.lazy(()=>import('./views/Pages/Kategoriler'))
const routes = [

  { path: '/',            exact: true,            name: 'Ana Sayfa' , component: Main },
  { path: '/sorgula',     exact: true,            name: 'Sorgula' ,   component: Sorgula },
  { path: '/login',       name: 'Login',          component:  Login},
  { path: '/kayit',       name: 'Kayıt',          component:  Kayıt},
  { path: '/urun',        name: 'Urun Sayfası',   component:  UrunSayfası},
  { path: '/siparis',     name: 'Yeni Sipariş',   component:  Siparis},
  { path: '/kategori',    name: 'Kategori',       component:  Kategoriler},
];

export default routes;
