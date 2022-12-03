import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Consumption ID',
        accessor: 'id',
    },
    {
        Header: 'Device ID',
        accessor: 'deviceId',
    },
    {
        Header: 'Timestamp',
        accessor: 'timestamp',
    },
    {
        Header: 'Value',
        accessor: 'value',
    }
    
];

const filters = [
    {
        accessor: 'id',
    }
];

class ConsumptionTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default ConsumptionTable;