import { Link, NavLink} from 'react-router-dom'
import './Navbar.css'

function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand">Stockers</Link>
            </div>
             <ul className="navbar-links">
                <li><NavLink to="/" className="nav-link">Home</NavLink></li>
                <li><NavLink to="/users" className="nav-link">Users</NavLink></li>
                <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
            </ul>
        </nav>

    )    
}
export default Navbar