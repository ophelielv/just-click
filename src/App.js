import React, { Component } from 'react';
import Square from './components/Square'
import './App.css';
import { faCoffee, faCloudMoon, faDragon, faGem, faLemon, faSnowman } from '@fortawesome/free-solid-svg-icons'

const GAMEWIDTH = 4;
const GAMEHEIGHT = 6
class App extends Component {
  constructor(props){
    super(props);

    const row = Array(GAMEWIDTH).fill({
      selected: 0,
    });

    const squares = Array(GAMEHEIGHT).fill(row);
    this.state = {
      squares: this.filTheSquares(squares),
    }
    console.log("state",this.state)
    
  }

  filTheSquares = (squares) => {
    let filledSquares = squares.map( (row, rowIndex) => {
      return row.map( (sq, i) => {
        const key =  4*rowIndex + i; // de 0 à 24
        return this.chooseSquare(key);
      })
    })
    return filledSquares;
  }

  chooseSquare(key){
    const square = {
      key: key,
      selected: false,
    }

    switch(key%6){
      case(0):
        square.icon = faCoffee;
        square.color = 'blue';
        break;
      case(1):
        square.icon = faCloudMoon;
        square.color = 'pink';
        break;
      case(2):
        square.icon = faDragon;
        square.color = 'green';
        break;
      case(3):
        square.icon = faGem;
        square.color = 'yellow';
        break;
      case(4):
        square.icon = faLemon;
        square.color = 'orange';
        break;
      default: 
        square.icon = faSnowman;
        square.color = 'red';
        break;
    }
    return square;
  }

  /**
   * 
   */
  drawSquares = () => {
    const { squares } = this.state;
    if(!squares){
      return null;
    }
    const list = squares.map( row => this.drawLine(row));
    return <li>{list}</li>
  }

  /**
   * line : *  *  *  *  
   */
  drawLine = (row) => {
    const cols = row.map( x => {
      return (
        <Square 
          icon={x.icon} 
          key={x.key} 
          color={x.color}
          selected={x.selected}
        />
      )
    })
    return <ul className="line">{cols}</ul>
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Fait disparaître les cases le plus vite possible
          </p> 
          <ul className="squaresList">
            {this.drawSquares()}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;
