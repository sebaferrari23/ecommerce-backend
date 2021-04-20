import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import NavCart from './NavCart.js'
import WidgetCart from './WidgetCart.js'

const Navbar = () => {
	const [isMenuActive, setIsMenuActive] = useState(false);
	const [navbarBg, setNavbarBg] = useState(false);
    const [showWidgetCart, setShowWidgetCart] = useState(false);
	const location = useLocation();

    useEffect(() => {
		if(location.pathname !== '/') {
			setNavbarBg(true);
		} else {
			window.addEventListener('scroll', changeBackground); 
			return () => {
				window.removeEventListener('scroll', changeBackground);
			}
		}
	}, [location]);
	
	const changeBackground = () => {
		if(window.scrollY >= 80) {
			setNavbarBg(true);
		} else {
			setNavbarBg(false);
		}
	}

    const openWidgetCart = () => {
        setShowWidgetCart(!showWidgetCart);
    }
	const quantity = 1;

    return (
		<>
       		<header className={`navbar is-fixed-top is-spaced ${!navbarBg ? "is-transparent" : ""}`}>

				<div className="container">
				
					<div className="navbar-brand">

						<Link to="/" className="navbar-item">
							<h1 className="title is-uppercase">GreenStore</h1>
						</Link>

						<button
							onClick={() => { setIsMenuActive(!isMenuActive); }}
							className={`navbar-burger burger ${isMenuActive ? "is-active" : ""}`}
							aria-label="menu"
							aria-expanded="false"
							data-target="navbarMenu"
						>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</button>

					</div>

					<div id="navbarMenu" className={`navbar-menu mr-4 ${isMenuActive ? "is-active" : ""}`}>
						<div className="navbar-end">
							{/* { categories.map( 
								category => 
									<NavLink key={category.id} to={category.route} className="navbar-item" activeClassName="active">
										{category.title}
									</NavLink>
								)
							} */}
						</div>
					</div>

					<NavCart quantity={quantity} action={openWidgetCart} />
				</div>
			</header>
			<WidgetCart show={showWidgetCart} action={openWidgetCart} />
		</>
	)
}

export default Navbar
