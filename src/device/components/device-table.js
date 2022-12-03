import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Device ID',
        accessor: 'id',
    },
    {
        Header: 'User ID',
        accessor: 'userId',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Max Consumption',
        accessor: 'maxConsumption',
    }
    
];

const filters = [
    {
        accessor: 'address',
    }
];

class DeviceTable extends React.Component {

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

export default DeviceTable;