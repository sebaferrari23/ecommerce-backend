import {useContext} from 'react'
import {Store} from '../../store'
import CartItem from './CartItem'

const CartItems = ({items}) => {
    const data = useContext(Store);
    return (
        <div className="table-container">
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th className="has-text-centered">Price</th>
                        <th className="has-text-centered">Quantity</th>
                        <th className="has-text-centered">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { items.length && items.map((item) => {
                    return (
                        <tr key={item.product.id}>
                            <CartItem
                                id={item.product.id}
                                stock={item.product.stock}
                                image={item.product.image}
                                title={item.product.title}
                                brand={item.product.brand}
                                price={item.product.price}
                                quantity={item.quantity}
                            />
                        </tr>
                    );
                })}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="4"></th>
                        <th className="has-text-right">Total: ${data.itemsCart.totalPrice}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default CartItems
