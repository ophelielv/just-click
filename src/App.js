import React, { Component } from 'react';
import Square from './components/Square'
import './App.css';
import { faCoffee, faCloudMoon, faDragon, faGem, faLemon, faSnowman, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GAME_X = 4;
const GAME_Y = 6;
class App extends Component {
  
  constructor(props){
    super(props);

    const squares = this._createNewGame();
    this.state = {
      squares: this._fillTheSquares(squares),
      nbSquares: GAME_X*GAME_Y,
    }    
  }

  _createNewGame = () => {
    // row = array of 4 items
    const row = Array(GAME_X).fill({
      clicked: 0,
    });

    const squares = Array(GAME_Y).fill(row);
    return this._fillTheSquares(squares);
  }

  //-----------------------
  //----------------------- Initialize
  //-----------------------

  _fillTheSquares = (squares) => {
    let filledSquares = squares.map( (row, rowIndex) => {
      return row.map( (sq, i) => {
        const id =  GAME_X*rowIndex + i; // 0 to 24
        
        return this._chooseItem(id);
      })
    })
    return filledSquares;
  }

  _chooseItem(id){
    const square = {
      id: id,
      clicked: false,
    }

    switch(id%6){
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
        square.color = 'grey';
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

  //-----------------------
  //----------------------- Display
  //-----------------------

  /**
   * Fill a line with <Square /> components
   * <button> is in <Square />
   */
  _drawLine = (row) => {
    const cols = row.map( x => {
      return (
        <Square 
          icon={x.icon} 
          id={x.id} 
          color={x.color}
          clicked={x.clicked}
          handleClick={this._handleClick}
        />
      )
    })
    return <ul className="Line-container-ul">{cols}</ul>
  }

  /**
   * Display line after line
   */
  _drawSquares = () => {
    const { squares } = this.state;
    if(!squares){
      return null;
    }

    const list = squares.map( (row, index) => {
      const line = this._drawLine(row);
      return (
        <li className='Squares-line' key={index}>
            {line}
        </li>
      );
    });
 
    return <ul className="Squares-list">{list}</ul>
  }

  //----------------------- 
  //----------------------- Events
  //----------------------- 

  _findSquare = (squares, squareId) => {

    let found = null;
    squares.forEach(row => {
      const squareArray = row.filter(x => x.id === squareId)
      if(squareArray.length === 1){
        found = squareArray[0];
      }
    })

    return found;
  }

  /**
   * Click on square
   */
  _handleClick = (squareId) => {
    const { squares } = this.state;

    const clickedSquare = this._findSquare(squares, squareId);
    if(clickedSquare){ 
      clickedSquare.clicked = true;
    }
    

    this.setState({
      squares: squares,
      nbSquares: --this.state.nbSquares,
    });
  }

  /**
   * Play again
   */
  _handlePlayAgain = () => {
    const squares = this._createNewGame();
    this.setState({
      squares: this._fillTheSquares(squares),
      nbSquares: GAME_X*GAME_Y,
    });
  }

  render() {
    const { nbSquares } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Fait disparaître les cases le plus vite possible
          </p> 
        </header>

        <body className="App-body">
          {this._drawSquares()}
        </body>

        <footer className="App-footer">
          <p>
            Il reste {nbSquares} case{nbSquares > 1 && 's'}
          </p>
          { (nbSquares === 0) && 
            <button className="Button-play-again" onClick={this._handlePlayAgain}> 
              <FontAwesomeIcon icon={faRedo} /> Recommencer
            </button>
          }
        </footer>
      </div>
    );
  }
}

export default App;
