import React from "react";
import Table from "../../commons/tables/table";


const columns = [

    {
        Header: 'Client ID',
        accessor: 'id',
    },
    {
        Header: 'User ID',
        accessor: 'userId',
    },

    {
        Header: 'Firstname',
        accessor: 'firstName',
    },
    {
        Header: 'Lastname',
        accessor: 'lastName',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
];

const filters = [
    {
        accessor: 'firstName',
    }
];

class ClientTable extends React.Component {

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

export default ClientTable;