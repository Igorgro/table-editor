import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { remote } from 'electron';
const dialog = remote.dialog;
import { promises } from 'fs';

import './app.css';
import { AppBar } from './appbar/appbar';
import { Navbar } from './navbar/navbar';
import { TableViewer } from './tableviewer/tableviewer';
import { Table, csvToTable, tableToCsv } from '../util';

interface AppState {
    modalVisible: boolean,
    tableVisible: boolean,
    filePath: string|null,
    table: Table|null
}

class App extends Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);
        this.state = { modalVisible: false, tableVisible: false, filePath: null, table: null };
        this.onOpenButtonClicked = this.onOpenButtonClicked.bind(this);
        this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this);
        this.onTableChanged = this.onTableChanged.bind(this);
    }

    onclose(): void {
        window.close();
    }

    async onOpenButtonClicked(): Promise<void> {
        const path: string = (await dialog.showOpenDialog({
            filters: [
                { name: 'CSV Files', extensions: ['csv'] }
            ],
            properties: ['openFile'] })).filePaths[0];
        const csv: string = await promises.readFile(path, { encoding: 'utf-8' });
        this.setState({ tableVisible: true, filePath: path, table: csvToTable(csv, ',') });
    }

    async onSaveButtonClicked(): Promise<void> {
        if (this.state.filePath && this.state.table) {
            await promises.writeFile(this.state.filePath, tableToCsv(this.state.table), { encoding: 'utf-8' });
        }
    }

    onTableChanged(table: Table): void {
        this.setState({ table });
    }

    render(): JSX.Element {
        return (
            <Container id='main-container' className='h-100 d-flex flex-column' fluid>
                <AppBar onclose={this.onclose}/>
                <Navbar
                    onOpenButtonClicked={this.onOpenButtonClicked}
                    onSaveButtonClicked={this.onSaveButtonClicked}/>
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
};
