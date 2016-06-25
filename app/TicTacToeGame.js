import React from 'react'


class GameButton extends React.Component{
  render() {
    let className = 'btn';
    if(this.props.value === 'X'){
      className += " btn-primary"
    }else if(this.props.value === 'O'){
      className += " btn-success"
    }else{
      className += " btn-default"
    }
    return (
      <button
        className={className}
        onClick={() => {
          this.props.onGameMove(this.props.row, this.props.col);
        }}
        disabled={this.props.value !== null}
        type="submit">{this.props.value === null ? "?" : this.props.value}</button>
    );
  }
}

class GameRow extends React.Component{
  render() {
    let rowValues = this.props.rowValues;
    let rowNumber = this.props.rowNumber;
    let buttons = [0, 1, 2].map((val) => {
      return <div className="col-xs-4 game-cell" key={rowNumber + "-" + val}>
        <GameButton value={rowValues[val]} row={rowNumber} col={val} onGameMove={this.props.onGameMove}/>
      </div>
    });
    return (
      <div className="row">
        {buttons}
      </div>
    );
  }
}


class Board extends React.Component{
  render(){
    let board = this.props.board;
    let rows = [0, 1, 2].map((val) => {
      return <GameRow rowValues={board[val]} rowNumber={val} key={val} onGameMove={this.props.onGameMove}/>
    });
    return <div className="row board-container">
      <div className="col-xs-12">
        {rows}
      </div>
    </div>
  }
}


class TicTacToeGame extends React.Component {
  constructor(){
    super();
    this.state = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      nextPlayer: 'X'
    };
  }
  handleGameMove(row, col){
    console.log("Row: %s, Col: %s", row, col)
    let board = this.state.board;
    board[row][col] = this.state.nextPlayer;
    let nextPlayer = this.state.nextPlayer === 'X' ? 'O' : 'X';

    this.setState({
      board: board,
      nextPlayer: nextPlayer
    });
  }
  render () {
    return <div className="center-block game-container">
      <div className="row">
        <div className="col-xs-12 text-center">
          <h1>React - Tic Tac Toe</h1>
        </div>
      </div>

      <Board board={this.state.board} onGameMove={this.handleGameMove.bind(this)}/>

      <div className="row text-center player-info">
        <p>Next player: <span>{this.state.nextPlayer}</span></p>
      </div>
    </div>
  }
}

export default TicTacToeGame;
