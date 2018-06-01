import React from 'react'
import { Link } from 'react-router-dom'
import HeinekenLogo from '../../../assets/heineken_logo_white.png'
import './LoginNavigation.css'


const loginNavigation = (props) => (
    <div className="row header">
        <div className="container">
            <div className="login-header">
            <Link to="/" >
                <img 
                    src={HeinekenLogo}
                    className="site-logo img-responsive"
                    alt="Heineken Logo"/>
            </Link>
            <nav className="header-nav">
                <Link to="/login" className="login-button">Uloguj se</Link>
            </nav>
            </div>
        </div>
    </div>        
)

export default loginNavigation;