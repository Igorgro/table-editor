import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { Csv, csvToArray } from "../../util";

interface FileModalProps {
    visible: boolean
    onload: (table: Csv) => void;
}

interface FileModalState {
    table: Csv|null
}

class FileModal extends Component<FileModalProps> {
    state: FileModalState
    fileRef: React.RefObject<HTMLInputElement>;

    constructor(props: FileModalProps){
        super(props);
        this.state = { table: null };
        this.fileRef = React.createRef();
        this.onFileLoaded = this.onFileLoaded.bind(this);
        this.onLoadButtonCLicked = this.onLoadButtonCLicked.bind(this);
    }

    shouldComponentUpdate(nextProps: FileModalProps, nextState: FileModalState): boolean {
        if (nextProps == this.props) return false;
        return true;
    }

    hide() {
        this.setState({ visible: false });
    }

    onFileLoaded() {
        if (this.fileRef.current && this.fileRef.current.files) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                if (reader.result) {
                    this.setState({ table: csvToArray(reader.result as string, ',') });
                }
            });
            reader.readAsText(this.fileRef.current.files[0]);
        }
    }

    onLoadButtonCLicked() {
        // Close dialog and emit event only if file successfuly loaded
        if (this.state.table) {
            this.props.onload(this.state.table);
            this.hide();
        }
    }

    render() {
        return (
            <Modal
                show={this.props.visible}
                backdrop='static'
                keyboard='false'
                centered
                >
                <Modal.Header>
                    <Modal.Title>Open table file</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.File ref={this.fileRef} onInput={this.onFileLoaded}></Form.File>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={this.onLoadButtonCLicked}>Open</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export {
    FileModal
}
