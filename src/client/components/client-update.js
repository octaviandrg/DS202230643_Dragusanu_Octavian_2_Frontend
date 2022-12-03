import React from 'react';
import validate from "./validators/client-validators.js";
import Button from "react-bootstrap/Button";
import * as API_CLIENTS from "../api/client-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class ClientUpdateForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                clientId: {
                    value: '',
                    placeholder: 'Insert the client id you want to update',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 1,
                        isRequired: true
                    }
                },
                firstName: {
                    value: '',
                    placeholder: 'firstname...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                lastName: {
                    value: '',
                    placeholder: 'lastName...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'Adddress...',
                    valid: false,
                    touched: false,
                },
                userId: {
                    value: '',
                    placeholder: 'User ID...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
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

    updateClient(client, clientId) {
        return API_CLIENTS.putClient(client, clientId, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated client with id: " + result);
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
        const clientId = this.state.formControls.clientId.value;
        this.updateClient(client, clientId);
    }

    render() {
        return (
            <div>
                <FormGroup id='clientId'>
                    <Label for='clientIdField'> Client ID: </Label>
                    <Input name='clientId' id='clientIdField' placeholder={this.state.formControls.clientId.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.clientId.value}
                           touched={this.state.formControls.clientId.touched? 1 : 0}
                           valid={this.state.formControls.clientId.valid}
                           required
                    />
                </FormGroup>

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

export default ClientUpdateForm;
