import React from 'react'
import './index.less'

export default function Index({img}:{img: string|undefined}) {
  img=(img==='')?"http://localhost:3001/imgs/logo.jpg" :img;
  return (
    <div className='message'>
        <div className='logo'>
            <img src={img} alt="logo" />
        </div>
    </div>
  )
}
