import React, { Component } from 'react'
import { Form, Input, Button, FormGroup } from 'reactstrap'
import './EditUser.css'
import FormValidator from '../../../helpers/FormValidator';

export default class EditUser extends Component {

  constructor() {
    super();
    
    this.formSubmitted = false;

    this.validator = new FormValidator([
      {
        field: "ime",
        method: "isEmpty",
        validWhen: false,
        message: "Ime je obavezno polje!"
      },
      {
        field: "prezime",
        method: "isEmpty",
        validWhen: false,
        message: "Prezime je obavezno polje!"
      },
      {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email je obavezno polje"
      },
      {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "Email nije validan"
      },
      {
        field: "telefon",
        method: "isEmpty",
        validWhen: false,
        message: "Telefon je obavezno polje!"
      },
      {
        field: "telefon",
        method: "matches",
        validWhen: true,
        args: [/^\d\d\d-?\d\d\d-?\d\d\d\d?$/],
        message: "Telefon nije u validnom formatu"
      }
    ])

    this.state = {
      id: "",
      ime: "",
      prezime: "",
      email: "",
      telefon: "",
      validation: this.validator.valid()
    }

  }

  componentDidMount() {
    this.assigneStateForUser();
  }

  assigneStateForUser = () => {
    if (this.props.location.state) {
      this.setState({...this.props.location.state.user});
    } else {
      this.props.history.push('/korisnici');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.formSubmitted = true;
    const validation = this.validator.validate(this.state);
    this.setState({validation});

    if (validation.isValid) {
      const {id, ime, prezime, email, telefon} = this.state;
      const user = {
        id,
        ime,
        prezime,
        email,
        telefon
      }
      this.props.updateEditedUser(user);
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    let validation = this.formSubmitted?
                        this.validator.validate(this.state):
                        this.state.validation

    return (
      <section className="edit-user">
      <Form onSubmit={this.handleSubmit} className="col-md-4">
        <FormGroup>
          <Input
              type="email"
              name="email"
              placeholder="Email"
              className={validation.email.isInvalid? 'has-error' : ''}
              value={this.state.email}
              onChange={this.handleChange}
          />
          <span className="helper-block">{validation.email.message}</span>
        </FormGroup>

      <FormGroup>
        <Input
            type="text"
            name="ime"
            placeholder="Ime"
            className={validation.ime.isInvalid? 'has-error' : ''}
            value={this.state.ime}          
            onChange={this.handleChange}          
        />
        <span className="helper-block">{validation.ime.message}</span>
      </FormGroup>

      <FormGroup>
        <Input
            type="text"
            name="prezime"
            placeholder="Prezime"
            className={validation.prezime.isInvalid? 'has-error' : ''}
            value={this.state.prezime}          
            onChange={this.handleChange}                    
        />
        <span className="helper-block">{validation.prezime.message}</span>
      </FormGroup>

      <FormGroup>
        <Input
            type="text"
            name="telefon"
            placeholder="Telefon"
            className={validation.telefon.isInvalid? 'has-error' : ''}
            value={this.state.telefon}          
            onChange={this.handleChange}         
        />
        <span className="helper-block">{validation.telefon.message}</span>
      </FormGroup>

      <Button type="submit" className="edit-btn">Sacuvaj</Button>
  </Form>
  </section>
    )
  }
}
