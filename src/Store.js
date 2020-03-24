import React,{useState,useReducer} from "react";
export const urunBolgesi = React.createContext([]);



const Store =({children})=> {
  const [urun,setUrun] = useState('deneme');
  const reducer=(store,action)=>{
    switch (action.type) {
      case 'ekle' : return  setUrun([...urun,action.data]);
      case 'bosalt': return  setUrun(null)
      case  'ver'   : return urun;
      default : throw  new Error('Seçim yapılmadı');
    }
  }
const [state,dispatch] = useReducer(reducer)

  return(
    <urunBolgesi.Provider value={[state,dispatch]}>
      {children}
    </urunBolgesi.Provider>
  )
}
export default Store
