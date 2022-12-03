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
import DeviceForm from "./components/device-form";

import * as API_DEVICES from "./api/device-api"
import DeviceTable from "./components/device-table";

import DeviceDeleteForm from "./components/device-delete";
import DeviceUpdateForm from "./components/device-update";


class DeviceContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.toggleFormDelete = this.toggleFormDelete.bind(this);
        this.toggleFormUpdate = this.toggleFormUpdate.bind(this);
        this.onViewDeviceClicked = this.onViewDeviceClicked.bind(this);
        this.state = {
            selected: false,
            selectedDelete: false,
            selectedUpdate: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchDevices();
    }

    fetchDevices() {
        return API_DEVICES.getDevices((result, status, err) => {

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
       // this.toggleForm();
        this.fetchDevices();
        
    }

    onViewDeviceClicked(){
        this.setState({
            viewDevicesToggle: !this.state.viewDevicesToggle
        });
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong><h2><center>Device</center></h2>  </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Device </Button>
                        </Col>
                        <br/>
                        <br/>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormUpdate}>Update Device </Button>
                        </Col>
                        <br/>
                        <br/>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormDelete}>Delete Device </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <DeviceTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                   
    
                </Card>

               


                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Device: </ModalHeader>
                    <ModalBody>
                        <DeviceForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedDelete} toggle={this.toggleFormDelete}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormDelete}> Delete Device: </ModalHeader>
                    <ModalBody>
                        <DeviceDeleteForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleFormUpdate}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormUpdate}> Update Device: </ModalHeader>
                    <ModalBody>
                        <DeviceUpdateForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default DeviceContainer;
