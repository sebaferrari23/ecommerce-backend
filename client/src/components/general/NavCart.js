import {useContext} from 'react'
import {Store} from '../../store'

const NavCart = ({action}) => {

    const data = useContext(Store);

    return (
        <button className="cart-widget navbar-item is-clickable is-pulled-right" onClick={action}>
            <span className="icon">
                <i className="fas fa-lg fa-shopping-cart"></i>
                <span className="cart-widget__badge has-background-danger">{data.itemsCart.totalCart}</span>
            </span>
        </button>
    )
}

export default NavCart
