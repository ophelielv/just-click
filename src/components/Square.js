import React, { Component } from 'react';
import './Square.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Square extends Component {
    render() {
        const id = this.props.id
        return (
            <li className={`Square bg-${this.props.color}`} key={id}>
                <FontAwesomeIcon icon={this.props.icon} />
            </li>
        )
    }
}