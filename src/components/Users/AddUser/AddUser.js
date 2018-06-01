import React, {Component} from 'react'
import { Form, Input, Button, FormGroup } from 'reactstrap'
import './AddUser.css'
import FormValidator from '../../../helpers/FormValidator'

class addUser extends Component {

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
                field: "telefon",
                method: "isEmpty",
                validWhen: false,
                message: "Telefon je obavezno polje!"
            },
            {
                field: "telefon",
                method: "matches",
                args: [/^\d\d\d-?\d\d\d-?\d\d\d$/],
                validWhen: true,
                message: "Telefon nije u validnom formatu"
            }
        ])
        
        this.state = {
            email: "",
            ime: "",
            prezime: "",
            telefon: "",
            avatar: "",
            validation: this.validator.valid()
        }
    }

    

    prepareUser = (e) => {
        e.preventDefault();
        this.formSubmitted = true;
        const validation = this.validator.validate(this.state);
        this.setState({ validation });

        if (validation.isValid) {
            const data = new FormData(e.target);
            this.props.addUser(data);
        }
        
    }

    handleInputChange = (e) => {
        if(e.target.name === 'avatar') {
            let image = e.target.files[0];
            let form = new FormData();
            form.append('image', image);
            this.setState({
               avatar: form,
            });
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let validation = this.formSubmitted?
                            this.validator.validate(this.state):
                            this.state.validation
    
    return (
        <section className="add-user">
        <Form onSubmit={this.prepareUser} className="col-md-6 col-lg-4">
            <FormGroup>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={validation.email.isInvalid? 'has-error' : ''}
                    onChange={this.handleInputChange}
                />
                <span className="helper-block">{validation.email.message}</span>
            </FormGroup>         

            <FormGroup>
                <Input
                    type="text"
                    name="ime"
                    placeholder="Ime"
                    className={validation.ime.isInvalid? 'has-error' : ''}
                    onChange={this.handleInputChange}
                />
                <span className="helper-block">{validation.ime.message}</span>
            </FormGroup>

            <FormGroup>
                <Input
                    type="text"
                    name="prezime"
                    placeholder="Prezime"
                    className={validation.prezime.isInvalid? 'has-error' : ''}
                    onChange={this.handleInputChange}
                />
                <span className="helper-block">{validation.prezime.message}</span>                
            </FormGroup>

            <FormGroup>
                <Input
                    type="text"
                    name="telefon"
                    placeholder="Telefon"
                    className={validation.telefon.isInvalid? 'has-error' : ''}
                    onChange={this.handleInputChange}
                />
                <span className="helper-block">{validation.telefon.message}</span>
            </FormGroup>

            <FormGroup className="add-avatar">
                <input
                    type="file"
                    name="avatar"
                    onChange={this.handleInputChange}
                    style={{display: "none"}}
                    ref={(fileInput) => this.fileInput = fileInput}
                />
                <Button color="danger" onClick={() => this.fileInput.click()}>Dodaj avatar</Button>                
            </FormGroup>

            <Button type="submit" className="add-btn">Sacuvaj</Button>
        </Form>
        </section>
    )
    }
}

export default addUser;