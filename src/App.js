import React, { Component } from 'react';
import Square from './components/Square'
import './App.css';
import { faCoffee, faCloudMoon, faDragon, faGem, faLemon, faSnowman } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor(props){
    super(props);

    const row = Array(4).fill({
      selected: 0,
    });

    const squares = Array(6).fill(row);
    this.state = {
      squares: this.filTheSquares(squares),
    }
    console.log(this.state)
    
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

  _showRow = () => {
    const { squares } = this.state.squares;
    squares.forEach( row => {})
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Fait disparaître les cases le plus vite possible
          </p> 
          <div className="container">
            <Square icon={faCoffee} />
            <Square icon={faCloudMoon} />
            <Square icon={faDragon} />
            <Square icon={faGem} />
            <Square icon={faLemon} />
            <Square icon={faSnowman} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
