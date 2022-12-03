import React from 'react';
import validate from "../../client/components/validators/client-validators";
import Button from "react-bootstrap/Button";
import * as API_CONSUMPTION from "../../consumption/api/consumption-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { object } from 'prop-types';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Chart from 'react-google-charts'
import {CanvasJSChart} from 'canvasjs-react-charts'
import { PlotSchema } from 'plotly.js';
import Plot from 'react-plotly.js';

var hours = [];
var cons = [];



class ConsumptionsGetByDevice extends React.Component {

    constructor(props) {
    
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                deviceId: {
                    value: '',
                    placeholder: 'ID device...',
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


    buildGraph(result){
        const length = result.length;
        console.log(length);
        for(var i = 0; i < length; i++){
            hours.push(result[i].hour);
            cons.push(result[i].value);
        }
        const mapat = hours.map((x, i) => ({ x, y: cons[i]}));
    }

    getConsumptionByDeviceId(deviceId, d, m, y) {
        return API_CONSUMPTION.getConsumptionsByDeviceId(deviceId, d, m, y, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
        
                this.buildGraph(result);
                //this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    

    handleSelect(date){
        //const date = this.state.formControls.date.value;
        const deviceId = this.state.formControls.deviceId.value;
        //const month = Date(Date.parse(date.substring(4,7) +" 1, 2012")).getMonth()+1
        const data = date.toString();
        const months = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
          }
        const m = months[data.substring(4, 7)];
        const d = data.substring(8, 10);
        const y = data.substring(11, 15);

        this.getConsumptionByDeviceId(deviceId, d, m, y);
        //console.log(date);
    }

    handleSubmit() {
        
        //const date = this.state.formControls.date.value;
        ///console.log(deviceId + ' data: ');
        
    }

    render() {
        return (
            <div>

                <FormGroup id='deviceId'>
                    <Label for='deviceIdField'> Device ID: </Label>
                    <Input name='deviceId' id='deviceIdField' placeholder={this.state.formControls.deviceId.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.deviceId.value}
                           touched={this.state.formControls.deviceId.touched? 1 : 0}
                           valid={this.state.formControls.deviceId.valid}
                           required
                    />
                </FormGroup>

                <div>
                
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>

                <Row>
                <Calendar 
                onChange={(date) => {this.handleSelect(date)}}

                />
                </Row>
     
                <Plot
                    data={[
                        {
                          hours,
                          cons,
                          type: 'scatter',
                          mode: 'lines',
                          
                        },
                        {type: 'bar', x: hours, y: cons},
                      ]}
                      layout={ {width: 600, height: 600, title: 'Consumption plot'} } 
                />
                    

                
                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
            
        ) ;
    }
}

export default ConsumptionsGetByDevice;
