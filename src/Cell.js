import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    static defaultProps = {
        status: false
    };

    handleClick(evt) {
        this.props.toggle();
    }

    render() {
        return (
            <td className={`Cell ${this.props.status ? 'Cell-Light' : ''}`} onClick={this.handleClick}></td>
        );
    }
}

export default Cell;