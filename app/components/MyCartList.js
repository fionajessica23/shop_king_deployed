import React from 'react'

export default function MyCartList(props) {
  const orders = props.orders
  const listOrders = orders.map((order, index) => {
    return <li key={index}>
      <div className='cart-list row'>
        <div className='col-xs-3 '>{order.name}  </div>
        <div className='col-xs-3 no-space'>
          <div className='qty-group'>
            <button onClick={() =>{ props.clickPlusHandler(order) }} type="button" className="btn btn-primary">+</button>
            <span className='qty'>{order.quantity} </span>
            <button onClick={() =>{ props.clickMinusHandler(index) }} type="button" className="btn btn-primary">-</button>
          </div>
        </div>
        <div className='col-xs-2 no-space'>{order.price}  </div>
        <div className='col-xs-2 no-space'>$ {order.quantity * order.price}  </div>
        <div className='col-xs-2 no-space'>
          <button onClick={() =>{ props.clickDelHandler(index) }} type="button" className="btn btn-primary">x</button>
        </div>
      </div>
    </li>
  })

  return (
    <div>
      <h2 className='title'>My Cart</h2>
        <div className='cart-list-header row'>
          <div className='col-xs-3'>Name</div>
          <div className='col-xs-3 text-center no-space'>Qty</div>
          <div className='col-xs-2 no-space'>Price</div>
          <div className='col-xs-2 no-space'>Total</div>
          <div className='col-xs-2 no-space'>&nbsp;</div>
        </div>
      <ul>{listOrders}</ul>
    </div>
  )
}
