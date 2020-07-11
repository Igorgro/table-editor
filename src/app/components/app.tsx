import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import './app.css';
import { AppBar } from './appbar/appbar';
import { TableViewer } from './tableviewer/tableviewer';
import { FileModal } from './filemodal/filemodal';

interface AppState {
    modalShown: boolean
}

class App extends Component {
    state: AppState

    constructor(props: any) {
        super(props);
        this.state = { modalShown: true }
    }

    onclose(): void {
        window.close();
    }

    onCsvLoaded() {

    }

    render() {
        return (
            <Container id='main-container' fluid>
                <AppBar onclose={this.onclose}></AppBar>
                <Navbar bg='success'>
                    <Navbar.Brand>Table editor</Navbar.Brand>
                </Navbar>
                <Row>
                    <Col>
                        <TableViewer></TableViewer>
                    </Col>
                </Row>
                <FileModal visible={this.state.modalShown} onload={this.onCsvLoaded}></FileModal>
            </Container>
        );
    }
}

export {
    App
}
