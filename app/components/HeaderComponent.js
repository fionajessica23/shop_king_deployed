import React from 'react'

export default function HeaderComponent(props) {

  return (
    <header>
      <div className='row'>
        <div className='col-xs-4 col-md-2'>
          <img className='logo' src='https://s3.amazonaws.com/shop-king/images/rsz_logo.jpg'></img>
        </div>
        <div className='col-xs-8 col-md-10 banner'></div>
      </div>
    </header>
  )
}
