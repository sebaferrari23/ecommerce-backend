import {useContext} from 'react'
import {Store} from '../../store'

const CartItem = ({ id, image, title, quantity, price, stock }) => {

    const data = useContext(Store);

    const removeItemFromCart = (id, quantity) => {
        const index = data.itemsCart.items.findIndex( find => find.product.id === id);
        const newItemsCart = data.itemsCart.items;
        newItemsCart.splice(index, 1);

        data.setItemsCart({
            items: newItemsCart,
            totalCart: data.itemsCart.totalCart - quantity,
            count: 1,
            totalPrice: data.itemsCart.totalPrice - (price * quantity)
        })
    }

    return (
        <>
            <td>
                <div className="is-flex is-align-items-center">
                    <figure className="image is-96x96 mr-3">
                        <img src={`/products/${image}`} alt={title} />
                    </figure>
                    <h3 className="title is-6">{title}</h3>
                </div>
            </td>
            <td className="has-text-centered">
                <p>${price}</p>
            </td>
            <td className="has-text-centered">
                <p>{quantity} items</p>
            </td>
            <td className="has-text-centered">
                <p>${price * quantity}</p>
            </td>
            <td className="has-text-right">
                <button onClick={ () => removeItemFromCart(id, quantity) } className="delete is-medium ml-4" ></button>
            </td>
        </>
    )
}

export default CartItem
