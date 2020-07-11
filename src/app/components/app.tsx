import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import './app.css';
import { AppBar } from './appbar/appbar';
import { TableViewer } from './tableviewer/tableviewer';
import { FileModal } from './filemodal/filemodal';
import { Csv } from "../util";

interface AppState {
    modalVisible: boolean,
    tableVisible: boolean,
    table: Csv|null
}

class App extends Component {
    state: AppState

    constructor(props: any) {
        super(props);
        this.state = { modalVisible: true, tableVisible: false, table: null };
        this.onCsvLoaded = this.onCsvLoaded.bind(this);
    }

    onclose(): void {
        window.close();
    }

    onCsvLoaded(table: Csv) {
        this.setState({ modalVisible: false, tableVisible: true, table });
    }

    render() {
        return (
            <Container id='main-container' fluid>
                <AppBar onclose={this.onclose}></AppBar>
                <Navbar bg='success'>
                    <Navbar.Brand>Table editor</Navbar.Brand>
                </Navbar>
                <Row id='main-row'>
                    <Col id='main-col'>
                        <TableViewer visibility={this.state.tableVisible} table={this.state.table}></TableViewer>
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
