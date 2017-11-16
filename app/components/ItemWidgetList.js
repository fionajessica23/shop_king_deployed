import React from 'react'

export default function ItemWidgetList(props) {
  const items = props.items
  const listItems = items.map((item, index) => {
    return <li key={index}
      onClick={() => { props.handleListItemClick(item) }}>
      <div className='card col-xs-6 col-md-4 col-lg-4 '>
        <div className='img-container'>
          <img src={item.imgUrl} className='img'/>
          <div className='info-overlay'>
            <div className='col-xs-6 item-name'>{item.name}</div>
            <div className='col-xs-6 item-price text-right'>$ {item.price}</div>
          </div>
        </div>
      </div>
    </li>
  })

  return (
    <div>
      <h2 className='title'>Items</h2>
      <ul className='row'>{listItems}</ul>
    </div>
  )
}
