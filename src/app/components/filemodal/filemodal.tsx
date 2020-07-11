import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface FileModalProps {
    show: boolean
}

interface FileModalState {
    show: boolean
}

class FileModal extends Component<FileModalProps> {
    state: FileModalState

    constructor(props: FileModalProps){
        super(props);
        this.state = { show: props.show };
    }

    render() {
        return (
            <Modal
                show={this.state.show}
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
                            <Form.File></Form.File>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary'>Open</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export {
    FileModal
}
