import React, { Component } from 'react';
import './Square.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Square extends Component {
    render() {
        return (
            <div className="Square">
                <FontAwesomeIcon icon={this.props.icon} />
            </div>
        )
    }
}