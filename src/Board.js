import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css'

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chancesLightAreOn: Math.random()
    };

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false, 
            board: this.createBoardEasy()
        };
    }

    createBoardEasy() {
        let x1 = Math.floor(Math.random() * this.props.nrows);
        let y1 = Math.floor(Math.random() * this.props.ncols);
        let x2 = Math.floor(Math.random() * this.props.nrows);
        let y2 = Math.floor(Math.random() * this.props.ncols);
        let condition1 = (i === x1 && (j === y1-1 || j === y1 || j === y1+1)) || (j === y1 && (i === x1-1 || i === x1+1));
        let condition2 = (i === x2 && (j === y2-1 || j === y2 || j === y2+1)) || (j === y2 && (i === x2-1 || i === x2+1));
        console.log(x1, y1);
        console.log(x2, y2);
        let board = [];
        for(var i=0; i<this.props.nrows; i++) {
            let row = [];
            for(var j=0; j<this.props.ncols; j++) {
                let num = Math.random();
                if((i === x1 && (j === y1-1 || j === y1 || j === y1+1)) || (j === y1 && (i === x1-1 || i === x1+1)) || (i === x2 && (j === y2-1 || j === y2 || j === y2+1)) || (j === y2 && (i === x2-1 || i === x2+1))) 
                    row.push(true);
                else    
                    row.push(false);
            }
            board.push(row);
        }
        console.log(board);
        return board;        
    }

    createBoardHard() {
        let board = [];
        for(let i=0; i<this.props.nrows; i++) {
            let row = [];
            for(let j=0; j<this.props.ncols; j++) {
                let num = Math.random();
                if(num > this.props.chancesLightAreOn)
                    row.push(true);
                else 
                    row.push(false);
            }
            board.push(row);
        }
        return board;
    }

    flipCellsAround(coords) {
        let { nrows, ncols } = this.props;
        let newBoard = this.state.board;
        let [x, y] = coords.split('-').map(Number);

        // console.log(x, y);

        function flipCells(x, y) {
            if(x >= 0 && x < nrows && y >= 0 && y < ncols) {
                newBoard[x][y] = !newBoard[x][y];
            }
        }

        flipCells(x, y);
        flipCells(x, y-1);
        flipCells(x, y+1);
        flipCells(x-1, y);
        flipCells(x+1, y);
        
        let winStatus = true;
        for(let i=0; i<nrows; i++) {
            for(let j=0; j<ncols; j++) {
                if(newBoard[i][j]) {
                    winStatus = false;
                    break;
                }
            }
        }

        // console.log(winStatus);

        this.setState({hasWon: winStatus, board: newBoard});
    }

    createTable() {
        let board = [];
        let stateBoard = this.state.board;
        for(let i=0; i<this.props.nrows; i++) {
            let row = [];
            for(let j=0; j<this.props.ncols; j++) {
                let coord = `${i}-${j}`;
                row.push(<Cell key={coord} status={stateBoard[i][j]} toggle={() => this.flipCellsAround(coord)}/>)
            }
            board.push(<tr key={i}>{row}</tr>);
        }
        return board;
    }

    restart() {
        this.setState({hasWon: false, board: this.createBoardEasy()});
    }

    render() {
        return (
            <div className='Board'>
                {this.state.hasWon ? 
                (<div>
                    <h1>YOU WON!</h1>
                    <button onClick={() => {this.restart()}}>Restart</button>
                </div>) 
                :
                (<div>
                    <h1>LIGHTS OUT!</h1>
                    <table>
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
                )
            }
            </div>
        );
    }
} 

export default Board;