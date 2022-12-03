import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {withRouter} from "react-router-dom";
import {Button, Card, CardHeader, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import * as API_USERS from "./api/login-api"


class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onLoginSuccessful = this.onLoginSuccessful.bind(this);
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            username: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    onLoginSuccessful(user) {
        this.props.onSuccess(user);
        this.props.history.push('/');
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
    }

    onUsernameChanged = (event) => {
        let newUsername = {...this.state.username};
        newUsername.touched = true;
        newUsername.value = event.target.value;

        this.setState({
            username: newUsername
        });
    }

    onPasswordChanged = (event) => {
        let newPassword = {...this.state.password};
        newPassword.touched = true;
        newPassword.value = event.target.value;

        this.setState({
            password: newPassword
        });
    }

    handleSubmit = () => {
        const username = this.state.username.value;
        const password = this.state.password.value;
        return API_USERS.login(username, password, (result, status, err) => {

            if (result !== null && status === 200) {
                this.onLoginSuccessful({
                    id: result.id,
                    username: result.username,
                    role: result.role
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    render() {
        const isUsernameValid = () => {
            const username = this.state.username;
            if (!username.touched) {
                return undefined;
            }

            return username &&
                username.touched &&
                username.value.length >= 3;
        }

        const isPasswordValid = () => {
            const password = this.state.password;
            if (!password.touched) {
                return undefined;
            }

            return password &&
                password.touched &&
                password.value.length >= 3;
        }

        const isFormValid = () => {
            return this.state.username.touched &&
                this.state.password.touched &&
                isUsernameValid() &&
                isPasswordValid();
        }

        return (
            <div>
                <CardHeader>
                    <strong><h2><center>Login</center></h2>  </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '4', offset: '4'}}>
                            <FormGroup id='username'>
                                <Label for='nameField'> Username: </Label>
                                <Input username='username' id='nameField' placeholder='Username'
                                       onChange={this.onUsernameChanged}
                                       value={this.state.username.value}
                                       valid={isUsernameValid()}
                                       required
                                />
                                {isUsernameValid() === false &&
                                <div className={"error-message row"}> * Username must have at least 3 characters </div>}
                            </FormGroup>


                            <FormGroup id='password'>
                                <Label for='passwordField'> Password: </Label>
                                <Input username='password' type='password' id='passwordField' placeholder='Password'
                                       onChange={this.onPasswordChanged}
                                       value={this.state.password.value}
                                       valid={isPasswordValid()}
                                       required
                                />
                            </FormGroup>

                            <Row>
                                <Col sm={{size: '4', offset: 8}}>
                                    <Button type={"submit"} disabled={!isFormValid()} onClick={this.handleSubmit}>  Submit </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>

                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

            </div>
        )

    }
}


export default withRouter(LoginContainer);
