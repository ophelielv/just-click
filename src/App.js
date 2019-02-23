import React, { Component } from 'react';
import Square from './components/Square'
import './App.css';
import { faCoffee, faCloudMoon, faDragon, faGem, faLemon, faSnowman, faRedo, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const GAME_X = 4;
const GAME_Y = 6;
class App extends Component {

  constructor(props){
    super(props);

    this.intervalID = null;
    this.timeSeconds = 0;

    const squares = this._createNewGame(GAME_X, GAME_Y);
    this.state = {
      squares: this._fillTheSquares(squares),
      nbSquares: GAME_X*GAME_Y,
      timeStr: this._secondsToStr(this.timeSeconds),
      bestTimeSeconds: null,
      gameX: GAME_X,
      gameY: GAME_Y,
      inputX: GAME_X,
      inputY: GAME_Y,
    };
  }

  _createNewGame = (X, Y) => {
    // row = array of 4 items
    const row = Array(X).fill({
      clicked: 0,
    });

    const squares = Array(Y).fill(row);
    return this._fillTheSquares(squares);
  }

  _secondsToStr = (s) => {
      const min = Math.floor(s/60);
      const sec = s - (min*60);
      const minStr = (min > 9) ? min : '0'+min;
      const secStr = (sec > 9) ? sec : '0'+sec;
      return minStr + ':' + secStr;
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
          key={x.id}
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
        <li className='Squares-line' key={`line-${index}`}>
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
      const squareArray = row.filter(x => (x.id === squareId && x.clicked === false))
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
    let { nbSquares } = this.state;

    this._startGame(nbSquares)

    const clickedSquare = this._findSquare(squares, squareId);

    if(clickedSquare){
      clickedSquare.clicked = true;
      nbSquares--;
    }

    this._endGame(nbSquares)

    this.setState({
      squares: squares,
      nbSquares: nbSquares,
    });
  }

  /**
   * To do when beginnig the game
   * On click on first square
   */
  _startGame = (nbSquares) => {
    const { gameX, gameY } = this.state;
    if(nbSquares === gameX * gameY){
      this.intervalID = setInterval(() => {
        this.timeSeconds++;
        this.setState({
          timeStr: this._secondsToStr(this.timeSeconds),
        });
      }, 1000);
    }
  }

  /**
   * To do when game is over
   */
  _endGame = (nbSquares) => {
    if(nbSquares === 0){
      clearInterval(this.intervalID);
      this.intervalID = null;

      // Save best time
      if(this.state.bestTimeSeconds === null || this.timeSeconds < this.state.bestTimeSeconds){
        this.setState({
          bestTimeSeconds: this.timeSeconds,
        });
      }

      this.timeSeconds = 0;
    }
  }

  /**
   * Play again
   */
  _handlePlayAgain = () => {
    const squares = this._createNewGame(this.state.gameX, this.state.gameY);
    clearInterval(this.intervalID);
    this.intervalID = null;
    this.timeSeconds = 0;
    this.setState({
      squares: this._fillTheSquares(squares),
      nbSquares: GAME_X*GAME_Y,
      timeStr: this._secondsToStr(this.timeSeconds),
    });
  }

  //-----------------------
  //----------------------- Change size of board
  //-----------------------

  _handleSubmitChangeGame = (event) => {
    event.preventDefault()
    const { inputX, inputY} = this.state;
    const squares = this._createNewGame(inputX, inputY);

    this.setState({
      squares: this._fillTheSquares(squares),
      nbSquares: inputX * inputY,
      timeStr: this._secondsToStr(this.timeSeconds),
      gameX: inputX,
      gameY: inputY,
    });
  }

  _handleChangeInputX = (event) => {
    this.setState({
      inputX: parseInt(event.target.value),
    });
  }

  _handleChangeInputY = (event) => {
    this.setState({
      inputY: parseInt(event.target.value),
    });
  }

  render() {
    const { nbSquares, bestTimeSeconds } = this.state;
    const bestTimeStr = this._secondsToStr(bestTimeSeconds);

    return (
      <div className="App">
        <header className="App-header">
          <h1>Fait disparaître les cases le plus vite possible</h1>
          <p className="Subtitle">
            <span className="Chrono">
              {this.state.timeStr}
            <button className="Button-default ml10" onClick={this._handlePlayAgain}>
              <FontAwesomeIcon icon={faRedo} /> Recommencer
            </button>
            </span>
            <span className="NbSquares">
              {nbSquares} case{nbSquares > 1 && 's'}
            </span>
          </p>
        </header>

        <section>
          {this._drawSquares()}
        </section>

        <footer>
          { bestTimeSeconds !== null &&
            <p>
              Meilleur temps : {bestTimeStr}
            </p>
          }

          <form name="change-game" className="Change-game-form">
            <label>
              <input type="number" value={this.state.inputX} name="gameX" onChange={this._handleChangeInputX}/>
              colonne{ this.state.inputX > 1 && 's'}
            </label>
            <span className="Operator">x</span>
            <label>
              <input type="number" value={this.state.inputY} name="gameY" onChange={this._handleChangeInputY}/>
              ligne{ this.state.inputY > 1 && 's'}
            </label>
            <button className="Button-default" onClick={this._handleSubmitChangeGame}>
              <FontAwesomeIcon icon={faCheck} /> Valider
            </button>
          </form>

        </footer>
      </div>
    );
  }
}

export default App;
