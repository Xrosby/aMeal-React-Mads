import React, {Component} from 'react';
import '../css/NavBar.css'
import {Link} from 'react-router-dom'


class NavBar extends Component {

    render() {
        return (
            <nav className="navbar fixed-top">
                    <ul className="nav navbar-nav">
                        <li><Link className="nav-link" id="nav-header" to="/frontpage">aMeal</Link></li>
                        <li><Link className="nav-link" to="/mealplans">Madplaner</Link></li>
                        <li><Link className="nav-link" to="/recipes">Opskrifter</Link></li>
                        <li><Link className="nav-link" to="/ingredients">Ingredienser</Link></li>
                        <li><Link className="nav-link" to="/user">Profil</Link></li>
                        <li><Link className="nav-link" to="/about">Om</Link></li>
                    </ul>
            </nav>
        )
    }
}

export default NavBar