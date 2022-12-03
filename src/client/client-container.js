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
import ClientUpdateForm from "./components/client-update";
import ClientDeleteForm from "./components/client-delete";
import ClientForm from "./components/client-form";

import * as API_CLIENTS from "./api/client-api"
import ClientTable from "./components/client-table";



class ClientContainer extends React.Component {

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
        return API_CLIENTS.getClients((result, status, err) => {

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
        //this.toggleForm();
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
                    <strong><h2><center>Client</center></h2>  </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Client </Button>
                        </Col>
                        <br/>
                        <br/>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormUpdate}>Update Client </Button>
                        </Col>
                        <br/>
                        <br/>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormDelete}>Delete Client </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <ClientTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>

               
                    
                    
                </Card>


                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Client: </ModalHeader>
                    <ModalBody>
                        <ClientForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}> Delete Client: </ModalHeader>
                    <ModalBody>
                        <ClientDeleteForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}> Update Client: </ModalHeader>
                    <ModalBody>
                        <ClientUpdateForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>
            </div>
        )

    }
}


export default ClientContainer;
