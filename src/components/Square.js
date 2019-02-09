import React, { Component } from 'react';
import './Square.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Square extends Component {
    constructor(props){
        super(props);
    }


    render() {
        
        return (
            <li className={`Square bg-${this.props.color}`}>
                <FontAwesomeIcon icon={this.props.icon} />
            </li>
        )
    }
}