import React from 'react'
import { Link } from 'react-router-dom'
import UsersList from './UsersList/UsersList'
import { Table } from 'reactstrap'
import Auxx from '../../Auxx'
import './UserPreview.css'

const userPreview = (props) => {

    const renderUserDetails = props.user.map(user => (
        <UsersList key={user.id} user={user} deleteUser={props.deleteUser} editUser={props.editUser}/>
    ))

    return (
    <Auxx>
        <Table className="user-table table-responsive-sm">
        <tbody>
            <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Telefon</th>
            </tr>
            {renderUserDetails}
        </tbody>
        </Table>
            <button className="add-btn">
                <Link to="/korisnici/dodajKorisnika">
                    Dodaj novog korisnika
                </Link>
            </button>
    </Auxx>
    )
}

export default userPreview;