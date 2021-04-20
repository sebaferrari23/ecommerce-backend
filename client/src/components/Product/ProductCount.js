import {useContext} from 'react'
import {Store} from '../../store'

const ProductCount = ( { stock } ) => {
    
    const data = useContext(Store);

    const add = () => {
        if(data.itemsCart.count < stock) {
            data.setItemsCart({
                ...data.itemsCart, 
                count: data.itemsCart.count + 1
            });
        }
    }
    const remove = () => {
        if(data.itemsCart.count === 1) return;
        data.setItemsCart({
            ...data.itemsCart, 
            count: data.itemsCart.count - 1
        });
    }

    return (
        <div className="product-counter">
            <button className="button is-success" onClick={ () => remove() } disabled={data.itemsCart.count===1} >
                <span className="icon is-small">
                    <i className="fas fa-minus"></i>
                </span>
            </button>
            <p>{data.itemsCart.count}</p>
            <button className="button is-success" onClick={ () => add() } disabled={data.itemsCart.count >= stock}>
                <span className="icon is-small">
                    <i className="fas fa-plus"></i>
                </span>
            </button>
        </div>
    )
}

export default ProductCount
