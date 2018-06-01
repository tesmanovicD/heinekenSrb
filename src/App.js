import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Users from './components/Users/Users'
import Navigation from './components/Navigation/Navigation'
import LoginNavigation from './components/Login/Navigation/LoginNavigation'
import UserProfile from './components/UserProfile/UserProfile'
import Auxx from './Auxx'
import { confirmAlert } from './helpers/util'

class App extends Component {

  state = {
    userLoggedIn: false,
    loggedUser: {},
    usersList: [],
  }
  
  updateLoggedUser = (User) => {
    this.setState({ userLoggedIn: true, loggedUser: User });
  }

  logOutUser = () => {
    if(confirmAlert("logout"))
      this.setState({userLoggedIn: false, loggedUser: {}});      
  }

  render() {
    return (
      <Router>
        <Auxx>
          {!this.state.userLoggedIn? 
            (
            <main className="login-page">
              <LoginNavigation/>
              <Login updateLoggedUser={this.updateLoggedUser}/>
            </main>
            )
            :
            (
            <Auxx>
            <Navigation logOut={this.logOutUser}/>
            <main className="container">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/korisnici" component={Users}/>
                <Route
                  path="/profil"
                  render={(props) => <UserProfile {...props} user={this.state.loggedUser}/>}
                />
            </Switch>
            </main>
            </Auxx>
            )
          }
      
        </Auxx>
      </Router>
    );
  }
}

export default App;
