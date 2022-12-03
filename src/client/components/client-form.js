import React from 'react';
import validate from "./validators/client-validators";
import Button from "react-bootstrap/Button";
import * as API_CLIENTS from "../api/client-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class ClientForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                userId: {
                    value: '',
                    placeholder: 'Insert user id that correspond the client',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },

                firstName: {
                    value: '',
                    placeholder: 'What is your firstname?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                lastName: {
                    value: '',
                    placeholder: 'What is your lastName?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'Set your address',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerClient(client) {
        return API_CLIENTS.postClient(client, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted client with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let client = {
            userId: this.state.formControls.userId.value,
            firstName: this.state.formControls.firstName.value,
            lastName: this.state.formControls.lastName.value,
            address: this.state.formControls.address.value,
        };

        console.log(client);
        this.registerClient(client);
    }

    render() {
        return (
            <div>

                <FormGroup id='userId'>
                    <Label for='userIdField'> User ID: </Label>
                    <Input name='userId' id='userIdField' placeholder={this.state.formControls.userId.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.userId.value}
                        touched={this.state.formControls.userId.touched ? 1 : 0}
                        valid={this.state.formControls.userId.valid}
                        required
                    />
                     {this.state.formControls.userId.touched && !this.state.formControls.userId.valid &&
                    <div className={"error-messagage row"}> * Id must have at least 3 characters </div>}
                
                </FormGroup>

                <FormGroup id='firstName'>
                    <Label for='firstNameField'> Firstname: </Label>
                    <Input name='firstName' id='firstNameField' placeholder={this.state.formControls.firstName.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.firstName.value}
                        touched={this.state.formControls.firstName.touched ? 1 : 0}
                        valid={this.state.formControls.firstName.valid}
                        required
                    />
        
                </FormGroup>

                <FormGroup id='lastName'>
                    <Label for='lastNameField'> Lastname: </Label>
                    <Input name='lastName' id='lastNameField' placeholder={this.state.formControls.lastName.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.lastName.value}
                        touched={this.state.formControls.lastName.touched ? 1 : 0}
                        valid={this.state.formControls.lastName.valid}
                        required
                    />
        
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.address.value}
                        touched={this.state.formControls.address.touched ? 1 : 0}
                        valid={this.state.formControls.address.valid}
                        required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default ClientForm;
