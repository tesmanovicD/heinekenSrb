import React, { Component } from 'react'
import { Form, Input, Button, FormGroup } from 'reactstrap'
import { logUser } from '../../helpers/util'
import './Login.css'
import FormValidator from '../../helpers/FormValidator'

export default class Login extends Component {

  constructor() {
    super();
    this.formSubmitted = false;
    this.validator = new FormValidator([
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email je obavezno polje!"
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "Email nije validan!"
      },
      {
        field: "lozinka",
        method: "isEmpty",
        validWhen: false,
        message: "Lozinka je obavezno polje!"
      }
    ])
    this.state = {
      email: "",
      lozinka: "",
      validation: this.validator.valid()
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.formSubmitted = true;
    const validation = this.validator.validate(this.state);
    this.setState({validation});

    if(validation.isValid) {
      const User = {
        email: e.target.email.value,
        lozinka: e.target.lozinka.value
      }
  
      logUser(User)
        .then(response => {     
          if(response) {
            this.props.updateLoggedUser(response);
          } else {
            alert("Korisnik nije pronadjen");
          }
        })
        .catch(err => {
          alert("Greska, server trenutno nije dostupan. Pokusajte kasnije!")
        }) 
    }
  }

  render() {
    let validation = this.formSubmitted? 
                        this.validator.validate(this.state):
                        this.state.validation
    return (
      <div className="login col-md-4">
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input
            type="email"
            name="email"
            className={validation.email.isInvalid? 'has-error' :''}
            onChange={this.handleInputChange}
            placeholder="super@super.com"
          />
          <span className="helper-block">{validation.email.message}</span>
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            name="lozinka"
            className={validation.lozinka.isInvalid? 'has-error' : ''}
            onChange={this.handleInputChange}            
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <span className="helper-block">{validation.lozinka.message}</span>
        </FormGroup>

        <a href="#passReset" className="reset-password">Zaboravljena lozinka?</a><br/>

        <Button className="login-button" type="submit">Uloguj se</Button>
      </Form>
      </div>
    )
  }
}
