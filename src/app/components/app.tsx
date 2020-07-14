import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import './app.css';
import { AppBar } from './appbar/appbar';
import { TableViewer } from './tableviewer/tableviewer';
import { FileModal } from './filemodal/filemodal';
import { Table } from "../util";

interface AppState {
    modalVisible: boolean,
    tableVisible: boolean,
    table: Table|null
}

class App extends Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = { modalVisible: true, tableVisible: false, table: null };
        this.onCsvLoaded = this.onCsvLoaded.bind(this);
        this.onTableChanged = this.onTableChanged.bind(this);
    }

    onclose(): void {
        window.close();
    }

    onCsvLoaded(table: Table) {
        this.setState({ modalVisible: false, tableVisible: true, table });
    }

    onTableChanged(table: Table) {
        this.setState({ table });
    }

    render() {
        return (
            <Container id='main-container' className='h-100 d-flex flex-column' fluid>
                <AppBar onclose={this.onclose}></AppBar>
                <Navbar bg='success'>
                    <Navbar.Brand>Table editor</Navbar.Brand>
                </Navbar>
                <Row id='main-row'>
                    <Col id='main-col' className='h-100'>
                        <TableViewer visibility={this.state.tableVisible} table={this.state.table} onTableChanged={this.onTableChanged}></TableViewer>
                    </Col>
                </Row>
                <FileModal visible={this.state.modalVisible} onload={this.onCsvLoaded}></FileModal>
            </Container>
        );
    }
}

export {
    App
}
