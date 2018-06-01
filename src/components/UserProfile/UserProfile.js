import React from 'react'
import './UserProfile.css'

const userProfile = (props) => (
    <section className="row col-md-8 col-lg-6 offset-md-2 offset-lg-3 user-details">
        <ul>
            <li className="user-name">
                {props.user.ime}
                <img
                    src={`http://localhost:4000/uploads/userAvatars/${props.user.avatar}`}
                    alt="User Avatar" 
                    className="img-responsive"
                />
            </li>
            <li>
                <h5>Prezime:</h5>
                <span>{props.user.prezime}</span>
            </li>
            <li>
                <h5>Email adresa:</h5>
                <span>{props.user.email}</span>
            </li>
            <li>
                <h5>Telefon:</h5>
                <span>{props.user.telefon}</span>
            </li>
        </ul>
    </section>
);

export default userProfile;