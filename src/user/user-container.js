import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import UserUpdateForm from "./components/user-update";
import UserDeleteForm from "./components/user-delete";
import UserForm from "./components/user-form";

import * as API_USERS from "./api/user-api"
import UserTable from "./components/user-table";



class UserContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleFormDelete = this.toggleFormDelete.bind(this);
        this.toggleFormUpdate = this.toggleFormUpdate.bind(this);
        this.onViewClientClicked = this.onViewClientClicked.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            selectedDelete: false,
            selectedUpdate: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            viewClientsToggle: false
        };
    }

    componentDidMount() {
        this.fetchClients();
    }

    fetchClients() {
        return API_USERS.getUsers((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    toggleFormDelete() {
        this.setState({selectedDelete: !this.state.selectedDelete});
    }

    toggleFormUpdate() {
        this.setState({selectedUpdate: !this.state.selectedUpdate});
    }


    reload() {
        this.setState({
            isLoaded: false,
            selected: false,
            selectedDelete: false,
            selectedUpdate : false,
        });
        this.toggleForm();
        this.fetchClients();
    }

    onViewClientClicked() {
        this.setState({
            viewClientsToggle: !this.state.viewClientsToggle
        });
    }

    render() {
        return (
            <div>
                <CardHeader>
                <strong><h2><center>User</center></h2>  </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add User </Button>
                        </Col>
                        <br/>
                        <br/>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormUpdate}>Update User </Button>
                        </Col>
                        <br/>
                        <br/>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormDelete}>Delete User </Button>
                        </Col>
                        <br/>
                       
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                                {this.state.isLoaded && <UserTable tableData = {this.state.tableData}/>}
                                {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                    errorStatus={this.state.errorStatus}
                                    error={this.state.error}
                                />   }
                                </Col>
                    </Row>
                   
                </Card>


                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add User: </ModalHeader>
                    <ModalBody>
                        <UserForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}> Delete User: </ModalHeader>
                    <ModalBody>
                        <UserDeleteForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}> Update User: </ModalHeader>
                    <ModalBody>
                        <UserUpdateForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}


export default UserContainer;
