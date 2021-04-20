import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Store} from '../../store'
import CartItems from './CartItems'

const Cart = () => {
    const data = useContext(Store);
    return (
        <section className="section is-medium">
            <div className="container">
                <h3 className="title is-uppercase mb-6">Shopping Cart</h3>
                { data.itemsCart.items.length  ?
                    <CartItems items={data.itemsCart.items} /> : 
                    <div className="box p-6 mb-6 has-text-centered">
                        <p className="title">Cart is empty</p>
                    </div>
                }
                <Link to="/" className="button is-success is-outlined is-rounded"><span className="icon"><i className="fas fa-arrow-left"></i></span><span>Continue shopping</span></Link>
                
                { data.itemsCart.items.length > 0 &&
                    <Link to="/checkout" className="button is-success is-pulled-right is-rounded">Go to Checkout</Link>
                }
            </div>
        </section>
    )
}

export default Cart
