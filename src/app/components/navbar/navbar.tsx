import React, { Component } from 'react';
import { Navbar as BNavbar, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

interface NavbarProps {
    onOpenButtonClicked: () => Promise<void>,
    onSaveButtonClicked: () => Promise<void>
}

class Navbar extends Component<NavbarProps> {
    constructor(props: NavbarProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <BNavbar bg='success' className='justify-content-between'>
                <BNavbar.Brand>Table editor</BNavbar.Brand>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-2" aria-label="First group">
                        <Button variant='light' onClick={this.props.onOpenButtonClicked}>
                            <i id='open-button' className='fa fa-folder-open fa-lg' aria-hidden='true'></i>
                        </Button>
                        <Button variant='light' onClick={this.props.onSaveButtonClicked}>
                            <i id='save-button' className='fa fa-floppy-o fa-lg' aria-hidden='true'></i>
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </BNavbar>
        );
    }
}

export {
    Navbar
};
