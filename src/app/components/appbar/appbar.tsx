import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import './appbar.css'

interface AppBarProps {
    onclose: () => void
}

interface AppBarState {
    onclose: () => void
}

class AppBar extends Component<AppBarProps, AppBarState> {
    constructor(props: AppBarProps) {
        super(props);
        this.state = { onclose: props.onclose };
    }

    render() {
        return (
            <Navbar id='appbar' className='justify-content-end'>
                <i onClick={this.state.onclose} id='close-button' className='fa fa-times' aria-hidden='true'></i>
            </Navbar>
        )
    }
}

export {
    AppBar
}
