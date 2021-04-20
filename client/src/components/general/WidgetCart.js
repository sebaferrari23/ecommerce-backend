
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {Store} from '../../store'

const WidgetCart = ({show, action}) => {

    const data = useContext(Store);

    const removeItemFromCart = (id, quantity) => {
        const index = data.itemsCart.items.findIndex( find => find.product.id === id);
        const newItemsCart = data.itemsCart.items;
        newItemsCart.splice(index, 1);

        data.setItemsCart({
            items: newItemsCart,
            totalCart: data.itemsCart.totalCart - quantity,
            count: 1
        })
    }

    const removeAllItemsFromCart = () => {
        data.setItemsCart({
            items:[],
            count: 1,
            totalCart: 0
        });
    }

    const cartList = data.itemsCart.items && data.itemsCart.items.map(item => 
        <div className="media is-flex is-align-items-center" key={item.product.id}>
            <figure className="media-left">
                <p className="image is-64x64">
                    <img src={`/products/${item.product.image}`} alt={item.product.title} />
                </p>
            </figure>
            <div className="media-content">
                <p className="title is-6">{item.product.title} <small>({item.quantity})</small></p>
            </div>
            <div className="media-right">
                <button onClick={ () => removeItemFromCart(item.product.id, item.quantity) } className="delete has-background-danger"></button>
            </div>
        </div>
    )

    return (
        <div className={`widgetCart ${show ? 'open' : 'close'}`}>
            <div className="mb-6 is-flex is-align-items-center is-justify-content-space-between">
                <p className="title mb-0">Your Cart ({data.itemsCart.totalCart})</p>
                <button onClick={action} className="delete is-large"></button>
            </div>
            { cartList }
            { data.itemsCart.totalCart > 0 &&
                <div className="is-flex is-align-items-center is-justify-content-space-between mt-6">
                    <button className="button is-danger is-rounded" onClick={removeAllItemsFromCart}>Remove all products</button>
                    <Link to="/cart" onClick={action} className="button is-success is-pulled-right is-rounded"><span>Go To Cart</span><span className="icon"><i className="fas fa-arrow-right"></i></span></Link>
                </div>
                
            }
        </div>
    )
}
export default WidgetCart
