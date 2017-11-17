import React from 'react'
import './App.scss'
import ItemWidgetList from './ItemWidgetList'
import MyCartList from './MyCartList'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.handleListItemClick = this.handleListItemClick.bind(this)
    this.clickPlusHandler = this.clickPlusHandler.bind(this)
    this.clickMinusHandler = this.clickMinusHandler.bind(this)
    this.clickDelHandler = this.clickDelHandler.bind(this)
    this.clickResetCartHandler = this.clickResetCartHandler.bind(this)
    this.clickApplyDiscHandler = this.clickApplyDiscHandler.bind(this)
    this.onInputChange = this.onInputChange.bind(this)

    this.state = {
      items: [],
      orders: [],
      discount: {
        voucherCode: 'DISC10',
        value: 0.1,
        dollarValue: 0,
        inputContent: ''
      },
      totalPrice: 0,
      grandTotalPrice: 0
    }
  }

  componentDidMount() {
    // API call, update state
    fetch('https://shop-king-api.herokuapp.com/api/items')
    .then(res => res.json())
    .then(res => {
      this.setState({ items: res.items })
    })
  }

  handleListItemClick(item) {
    var { items, orders } = this.state
    // find item in orders by their id
    var existingCartItem = orders.filter(order => order.id === item.id)[0]

    if (existingCartItem) {
      existingCartItem.quantity = ++existingCartItem.quantity
    } else {
      var copiedItem = Object.assign({}, item)
      copiedItem.quantity = 1
      orders.push(copiedItem)
    }

    this.setState({ orders: orders })
  }

  clickPlusHandler(order) {
    order.quantity ++

    var orders = this.state.orders
    this.setState({ orders: orders })
  }

  clickDelHandler(index) {
    var orders = this.state.orders

    orders.splice(index, 1)
    this.setState({ orders: orders })
  }


  clickMinusHandler(index) {
    var orders = this.state.orders

    orders[index].quantity --

    // if quantity = 0, remove this item from orders
    if (orders[index].quantity <= 0) {
      this.clickDelHandler(index)
    }
    this.setState({ orders: orders })
  }

  clickResetCartHandler() {
    var { items, orders, discount, totalPrice, grandTotalPrice } = this.state
    discount.dollarValue = 0
    this.setState({ orders: [], totalPrice: 0, discount: discount, grandTotalPrice: 0 })
  }

  onInputChange(event) {
    var discount = this.state.discount
    discount.inputContent = event.target.value
    this.setState({ discount: discount })
  }

  clickApplyDiscHandler(event) {
    var { items, orders, discount, totalPrice, grandTotalPrice } = this.state
    var voucherInput = event.target.parentNode.querySelector('input').value
    var voucherCode = discount.voucherCode
    if (voucherInput === voucherCode) {
      totalPrice = orders.map(order => order.quantity * order.price).reduce((prev, next) => prev + next, 0)
      discount.dollarValue = discount.value * totalPrice
      grandTotalPrice = totalPrice - discount.dollarValue
    }

    discount.inputContent = ''

    this.setState({ totalPrice: totalPrice, discount: discount, grandTotalPrice: grandTotalPrice })
  }

  render() {
    var { items, orders, discount, totalPrice, grandTotalPrice } = this.state
    const isDisabled = discount.inputContent.length === 0
    totalPrice = orders.map(order => order.quantity * order.price).reduce((prev, next) => prev + next, 0)
    grandTotalPrice = totalPrice - discount.dollarValue

    return (
      <div className='container'>
        <HeaderComponent />
        <div className='row'>
          <div className='col-sm-12 col-md-5'>
            <div className='cart-panel row'>

              <MyCartList orders={orders} clickPlusHandler={this.clickPlusHandler} clickMinusHandler={this.clickMinusHandler} clickDelHandler={this.clickDelHandler}/>

              <div className='payment row'>
                <div className='col-xs-12'>
                  <div className='col-xs-9'>Total</div>
                  <div className='col-xs-3 total'> ${totalPrice}</div>
                </div>
              </div>

              <div className='discount row'>
                <div className='col-xs-3 col-sm-4'>Have a voucher :</div>
                <div className='col-xs-9 col-sm-8 text-right'>
                  <input
                    onChange={this.onInputChange}
                    value={this.state.discount.inputContent}
                    type='text'></input>
                  <button
                    disabled={isDisabled}
                    onClick={this.clickApplyDiscHandler}
                    className='btn btn-primary'>Apply</button>
                </div>
              </div>

              <div className='discount row'>
                <div className='col-xs-12'>
                  <div className='col-xs-9'>Discount</div>
                  <div className='col-xs-3 total'> ${discount.dollarValue}</div>
                </div>
              </div>

              <div className='payment row'>
                <div className='col-xs-12'>
                  <div className='col-xs-9'>Grand Total</div>
                  <div className='col-xs-3 total'> ${grandTotalPrice}</div>
                </div>
              </div>

              <div className='discount row'>
                <div className='col-xs-6'>
                  <button onClick={this.clickResetCartHandler} type="button" className="btn btn-primary">Reset My Cart</button>
                </div>
                <div className='col-xs-6 text-right'>
                  <button type="button" className="btn btn-primary">Pay</button>
                </div>
              </div>
            </div>
          </div>

          <div className='item-panel col-xs-12 col-md-7'>
            <ItemWidgetList items={items} handleListItemClick={this.handleListItemClick} />
          </div>
        </div>
        <FooterComponent />
      </div>
    )
  }
}
