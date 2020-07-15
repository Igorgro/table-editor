import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { remote } from "electron";
const dialog = remote.dialog
import { promises } from "fs";

import './app.css';
import { AppBar } from './appbar/appbar';
import { Navbar } from "./navbar/navbar";
import { TableViewer } from './tableviewer/tableviewer';
import { Table, csvToArray } from "../util";

interface AppState {
    modalVisible: boolean,
    tableVisible: boolean,
    filePath: string|null,
    table: Table|null
}

class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = { modalVisible: false, tableVisible: false, filePath: null, table: null };
        this.onOpenButtonClicked = this.onOpenButtonClicked.bind(this);
        this.onTableChanged = this.onTableChanged.bind(this);
    }

    onclose(): void {
        window.close();
    }

    async onOpenButtonClicked(): Promise<void> {
        const path = (await dialog.showOpenDialog({
            filters: [
                { name: 'CSV Files', extensions: ['csv'] }
            ],
            properties: ['openFile'] })).filePaths[0];
        const csv: string = await promises.readFile(path, {encoding: 'utf-8'});
        this.setState({ tableVisible: true, filePath: path, table: csvToArray(csv, ',') });
    }

    onTableChanged(table: Table) {
        this.setState({ table });
    }

    render() {
        return (
            <Container id='main-container' className='h-100 d-flex flex-column' fluid>
                <AppBar onclose={this.onclose}/>
                <Navbar onOpenButtonClicked={this.onOpenButtonClicked}/>
                <Row id='main-row'>
                    <Col id='main-col' className='h-100'>
                        <TableViewer visibility={this.state.tableVisible} table={this.state.table} onTableChanged={this.onTableChanged}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export {
    App
}
