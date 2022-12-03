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


import * as API_CONSUMPTIONS from "./api/consumption-api"
import ConsumptionTable from "./components/consumption-table";



class ConsumptionContainer extends React.Component {

    constructor(props) {
        super(props);

        this.onViewClientClicked = this.onViewClientClicked.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
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
        return API_CONSUMPTIONS.getConsumptionsByDeviceId((result, status, err) => {

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
                <strong><h2><center>Consumption</center></h2>  </strong>
                </CardHeader>
                <Card>
                    
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <ConsumptionTable tableData = {this.state.tableData}/>}
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


export default ConsumptionContainer;
