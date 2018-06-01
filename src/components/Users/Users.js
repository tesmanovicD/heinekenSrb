import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Auxx from '../../Auxx'
import AddUser from './AddUser/AddUser'
import EditUser from './EditUser/EditUser'
import UserPreview from './UserPreview'
import { getUsers, confirmAlert } from '../../helpers/util'
import { BarLoader } from 'react-spinners'
import { Alert } from 'reactstrap'
import Request from 'superagent'

export default class Users extends Component {

  state = {
    users: [],
    userToEdit: {},
    request: {
      status: "PENDING",
      message: ""
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    getUsers()
    .then(users => {
      this.setState({users, request:{status: "SUCCESS"}})
    })
    .catch(err => {
      let errMsg = "Greska, trenutno nije moguce dobaviti listu korisnika. Pokusajte kasnije!"
      this.setState({request:{status: "ERROR", message: errMsg}})
    })
  } 

  showComponentBasedOnReqStatus = (status) => {
    switch(status) {
      case "PENDING":
        return (
        <div className="col-md-6 offset-md-3">
          <BarLoader width={100} widthUnit={"%"} height={10} color={'#0D853D'} />
        </div>
        )
      case "SUCCESS":
        return (
          <Auxx>
          <Route exact path="/korisnici"
            render={(props) => <UserPreview user={this.state.users} deleteUser={this.deleteUser} editUser={this.editUser}/>}/>
  
            <Route 
              path="/korisnici/dodajKorisnika"
              render={(props) => <AddUser addUser={this.addUser}/>}/>
  
            <Route 
              path="/korisnici/izmeniKorisnika" 
              render={(props) => <EditUser location={this.props.location} updateEditedUser={this.updateEditedUser}/>}
            />
          </Auxx>
        )
      case "ERROR":
        return <Alert color="danger">{this.state.request.message}</Alert>
      default:
        return <Alert color="danger">Doslo je do greske, kontaktirajte admina</Alert>
    }
  }

  deleteUser = (id) => {
    if(confirmAlert("delete")) {
      const updatedUsers = this.state.users.filter(x => x.id !== id); 
      Request.post("http://localhost:4000/korisnici/ukloniKorisnika")
        .send({userId: id})
        .then(response => {
          alert(response.text);
          this.setState({users: updatedUsers});          
        })
        .catch((err) => {
          console.log(err.response.status);
        })
    }   
  }

  addUser = (userFormData) => {
    userFormData.set("avatarName", "test")
    Request.post("http://localhost:4000/korisnici/dodajKorisnika")
      .send(userFormData)
      .then(response => {
        alert(response.text);
        this.props.history.push('/korisnici');        
        this.fetchUsers();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  editUser = (id) => {
    const userToEdit = this.state.users.find(x => x.id === id);
    this.setState({userToEdit});
  }

  updateEditedUser = (user) => {
    const usersList = this.state.users;
    const indexToChange = usersList.findIndex(x => x.id === user.id);
    usersList[indexToChange] = user;
    
    Request.put(`http://localhost:4000/korisnici/izmeniKorisnika/${user.id}`)
    .send(user)
    .then(response => {
      alert(response.text);
      this.setState({users: usersList});
      this.props.history.push('/korisnici');
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
  
    return (
      <Auxx>
        {this.showComponentBasedOnReqStatus(this.state.request.status)}
      </Auxx>
    )
  }
}
