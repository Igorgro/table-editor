import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Csv } from "../../util";

interface TableViewerProps {
    visibility: boolean,
    table: Csv|null
}

class TableViewer extends Component<TableViewerProps> {
    constructor(props: TableViewerProps) {
        super(props);
    }

    render(){
        if (this.props.visibility &&  this.props.table) {

            return (
                <Table bordered striped>
                    <thead>
                        <tr key='0' id='0'>
                            {this.props.table[0].map((th, thn) => <th id={`0 ${thn}`} key={`0 ${thn}`}>{th.toString()}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.table.slice(1).map((row, rown) => <tr key={`${rown+1}`} id={`${rown+1}`}>{row.map((item, itemn) => <td id={`${rown+1} ${itemn}`} key={`${rown+1} ${itemn}`}>{item.toString()}</td>)}</tr>)}
                    </tbody>
                </Table>
            )
        }
        else {
            return (
                <></>
            )
        }
    }
}

export {
    TableViewer
}
