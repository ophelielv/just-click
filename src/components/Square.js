import React, { Component } from 'react';
import './Square.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Square extends Component {
    _handleClick = () => {
        this.props.handleClick(this.props.id)
    }

    render() {
        const id = this.props.id
        const bgColor = (this.props.clicked) ? 'bg-transparent' : 'active bg-'+this.props.color;
        
        return (
            <li className={`Square ${bgColor}`} 
                key={id}
                onClick={this._handleClick}
            > 
                <FontAwesomeIcon icon={this.props.icon} />
            </li>
        )
    }
}