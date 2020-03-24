import React, {useState} from 'react'

const SepetButon =({children})=>{
  const seçkeContext = React.CreateContext('')
 const [sepet,Seçke] = useState(false)
  return(
    <seçkeContext.Provider value={[sepet,Seçke]}>
      {children}
    </seçkeContext.Provider>
  )
}
export default SepetButon
