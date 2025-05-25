// import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/car.reducer.js'

import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const cartLength = useSelector(storeState => storeState.carModule.shoppingCart.length)

    const dispatch = useDispatch()

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }


    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Car App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                    <a className='shopping-cart-link' onClick={onToggleCart} href="#">
                        🛒 Cart
                        {cartLength > 0 && <span className='shopping-cart-count'>{cartLength}</span>}
                    </a>
                </nav>
            </section>
        </header >
    )
}
