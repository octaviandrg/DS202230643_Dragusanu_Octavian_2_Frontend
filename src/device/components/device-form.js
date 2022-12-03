import React from 'react';
import validate from "./validators/device-validators";
import Button from "react-bootstrap/Button";
import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import { Col, Row } from "reactstrap";
import { FormGroup, Input, Label } from 'reactstrap';



class DeviceForm extends React.Component {

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
                    placeholder: 'Insert user id that correspond the device',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                description: {
                    value: '',
                    placeholder: 'Say something...',
                    valid: false,
                    touched: false,
                },
                address: {
                    value: '',
                    placeholder: 'Where is the device?',
                    valid: false,
                    touched: false,
                },

                maxConsumption: {
                    value: '',
                    placeholder: 'Maximum value',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({ collapseForm: !this.state.collapseForm });
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

    registerDevice(device) {
        return API_DEVICES.postDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted device with id: " + result);
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
        let device = {
            userId: this.state.formControls.userId.value,
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            maxConsumption: this.state.formControls.maxConsumption.value
        };

        console.log(device);
        this.registerDevice(device);
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

                <FormGroup id='description'>
                    <Label for='descriptionField'> Description: </Label>
                    <Input name='description' id='descriptionField' placeholder={this.state.formControls.description.placeholder}
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.description.value}
                        touched={this.state.formControls.description.touched ? 1 : 0}
                        valid={this.state.formControls.description.valid}
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

                <FormGroup id='maxConsumption'>
                    <Label for='maxConsumptionField'> Max Consumption: </Label>
                    <Input name='maxConsumption' id='maxConsumptionField' placeholder={this.state.formControls.maxConsumption.placeholder}
                        min={0} max={100} type="number"
                        onChange={this.handleChange}
                        defaultValue={this.state.formControls.maxConsumption.value}
                        touched={this.state.formControls.maxConsumption.touched ? 1 : 0}
                        valid={this.state.formControls.maxConsumption.valid}
                        required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{ size: '4', offset: 8 }}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error} />
                }
            </div>
        );
    }
}

export default DeviceForm;
