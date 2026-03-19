import React from 'react'

const Formcommon = ({type,label,placeholder,value,setvalue}) => {
  return (
     <div>
  <label htmlFor={label}>{label}</label>
         <input 
         type={type}
          value={value}
          onChange={(e)=>{
            setvalue(e.target.value)
          }}
             placeholder={placeholder}
          id='lable'
         />
    
     </div>
  )
}

export default Formcommon