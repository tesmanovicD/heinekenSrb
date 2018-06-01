import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Auxx from '../../Auxx'
import HeinekenLogo from '../../assets/heineken_logo.png'
import "./Navigation.css"
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free-solid'

const navigation = (props) => (
    <div className="row header">
        <div className="container">
            <div className="header-content">
            <Link to="/">
                <img 
                    src={HeinekenLogo}
                    className="site-logo img-responsive"
                    alt="Heineken Logo"/>
            </Link>                      
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <section className="header-options">
            <ul className="user-settings">
                <li title="Moj Profil">
                    <Link to="/profil">
                        <FontAwesomeIcon icon="user" />
                    </Link>
                </li>
                
                <li title="Korpa">
                    <FontAwesomeIcon icon="shopping-cart" /> 
                </li>
                
                <li title="Odjavi se">
                    <FontAwesomeIcon
                        icon="sign-out-alt"
                        onClick={() => props.logOut()} /> 
                </li>
            </ul>
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>            
            <nav className="menu">
                <Auxx>
                    <NavLink to="/artikli" activeClassName="active">
                        Artikli
                    </NavLink>
                    <NavLink to="/narudzbenica" activeClassName="active">
                        Narudzbenica
                    </NavLink>
                    <NavLink to="/korisnici" activeClassName="active">
                        Korisnici
                    </NavLink>
                </Auxx>
            </nav>
            </section>
            </div>
        </div>
    </div>        
)

export default navigation;