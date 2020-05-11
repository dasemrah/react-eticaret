import axios from 'axios'

const saglayici = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : "https://svglback.herokuapp.com/",
  withCredentials: true,
  timeout: 50000
})
saglayici.interceptors.request.use(ayar => {
  return ayar
}, sorun => {
  return Promise.reject(sorun)
})

saglayici.interceptors.response.use(yanıt => {
  return yanıt
}, sorun => {
  return Promise.reject(sorun)
})

export default saglayici;
