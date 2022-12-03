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
import * as API_DEVICES from "./api/device-api"
import DeviceTable from "./components/device-table";
import ConsumptionTable from "../consumption/components/consumption-table"
import ConsumptionsGetByDevice from './components/consumptions-get';




class UserDeviceContainer extends React.Component {

    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
        this.toggleFormGetConsumptionByDevice = this.toggleFormGetConsumptionByDevice.bind(this);
        this.state = {
            selected: false,
            selectedGetConsumption: false,
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
        return API_DEVICES.getDevicesByUsername((result, status, err) => {

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



    reload() {
        this.setState({
            isLoaded: false,
            selected: false,
            selectedGetConsumption: false
        });
        this.toggleForm();
        this.fetchDevices();
        
    }

    toggleFormGetConsumptionByDevice() {
        this.setState({selectedGetConsumption: !this.state.selectedGetConsumption});
    }



    render() {
        return (
            <div>
                <CardHeader>
                <strong><h2><center>Consumption</center></h2>  </strong>
                </CardHeader>
                <Card>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <DeviceTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleFormGetConsumptionByDevice}>Consumption for Device </Button>
                        </Col>
                    </Row>
                    <br/>
                    {/* {this.state.selectedGetConsumption &&
                    (<Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <ConsumptionTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>)} */}

                    
                   
    
                </Card>

                <Modal isOpen={this.state.selectedGetConsumption} toggle={this.toggleFormGetConsumptionByDevice}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleFormGetConsumptionByDevice}> Get consumption for device: </ModalHeader>
                    <ModalBody>
                        <ConsumptionsGetByDevice reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default UserDeviceContainer;
