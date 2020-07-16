import React, { Component } from 'react';
import { Table as BTable, Form } from 'react-bootstrap';
import { Table } from '../../util';

interface TableViewerProps {
    visibility: boolean,
    table: Table|null,
    onTableChanged: (table: Table)=>void
}

type Point = Array<number>;

interface TableViewerState {
    selectedCell: Point|null
}

class TableViewer extends Component<TableViewerProps, TableViewerState> {
    constructor(props: TableViewerProps) {
        super(props);
        this.state = { selectedCell: null };
        this.onCellSelected = this.onCellSelected.bind(this);
        this.onCellChanged = this.onCellChanged.bind(this);
        this.onTableClicked = this.onTableClicked.bind(this);
    }

    onCellSelected(event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>): void {
        this.setState({ selectedCell: (event.target as HTMLTableDataCellElement).id.split(' ').map(s => parseInt(s)) });
    }

    onCellChanged(event: React.FormEvent<HTMLInputElement>): void {
        // Calculate coordinates of edited cell
        const coord = (event.target as HTMLTableDataCellElement).id.split(' ').map(s => parseInt(s));
        if (this.props.table) {
            const newTable = this.props.table;
            newTable[coord[0]][coord[1]] = (event.target as HTMLInputElement).value;
            this.props.onTableChanged(newTable);
        }
    }

    // When table is clicked we should stop editing
    // TODO: Stop editing when esc key is clicked
    onTableClicked(): void {
        this.setState({ selectedCell: null });
    }

    render(): JSX.Element{
        if (this.props.visibility && this.props.table) {
            return (
                <BTable bordered striped onClick={this.onTableClicked}>
                    <thead>
                        <tr key='0' id='0'>
                            {this.props.table[0].map((th, thn) => <th id={`0 ${thn}`} key={`0 ${thn}`}>{th.toString()}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.table.slice(1).map((row, rown) => {
                            return (
                                <tr key={`${rown + 1}`} id={`${rown + 1}`}>
                                    {row.map((item, itemn) => {
                                        // Check if there any selected cell
                                        if (this.state.selectedCell) {
                                            // Check if current td item is selected for editing
                                            if (this.state.selectedCell[0] == rown + 1 && this.state.selectedCell[1] == itemn) {
                                                const inputStyle = {
                                                    width: item.toString().length * 7 + 24
                                                };
                                                return (
                                                    <td key={`${rown + 1} ${itemn}`}>
                                                        <Form.Control type="text"
                                                            defaultValue={item.toString()}
                                                            id={`${rown + 1} ${itemn}`}
                                                            size="sm"
                                                            onInput={this.onCellChanged}
                                                            // If currently editing cell clicked, we should no stop editing
                                                            onClick={(event: React.MouseEvent) => {event.stopPropagation();}}
                                                            style={inputStyle}
                                                        />
                                                    </td>
                                                );
                                            }
                                        }
                                        return (
                                            <td id={`${rown + 1} ${itemn}`}
                                                key={`${rown + 1} ${itemn}`}
                                                onDoubleClick={this.onCellSelected}>
                                                {item.toString()}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </BTable>
            );
        }
        else {
            return (
                <></>
            );
        }
    }
}

export {
    TableViewer
};
