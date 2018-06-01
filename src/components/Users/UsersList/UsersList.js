import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import "./UsersList.css"
import { Link } from 'react-router-dom'

const usersList = (props) => {

    return (
        <tr>
            <td>{props.user.ime}</td>
            <td>{props.user.prezime}</td>
            <td>{props.user.email}</td>
            <td>{props.user.telefon}</td>
            <td>
                <Link
                    title="Izmeni korisnika" 
                    to={{pathname: "/korisnici/izmeniKorisnika", state:{user: props.user}}}
                    className="options edit-btn">
                        <FontAwesomeIcon icon="edit" />
                </Link>
                <span
                    title="Obrisi korisnika" 
                    className="options delete-btn" 
                    onClick={() =>props.deleteUser(props.user.id)}
                >
                    <FontAwesomeIcon icon="times" />
                </span>                
            </td>            
        </tr>
    )
}

export default usersList;