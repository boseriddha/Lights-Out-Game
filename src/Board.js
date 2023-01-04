import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css'

class Board extends Component {
    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chancesLightAreOn: 0.50
    };

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false, 
            board: this.createBoard()
        };
    }

    createBoard() {
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
        
        let winStatus;
        let count = 0;
        for(let i=0; i<nrows; i++) {
            for(let j=0; j<ncols; j++) {
                if(newBoard[i][j]) {
                    count++;
                }
            }
        }

        if(count > 2) {
            winStatus = false;
        } else {
            winStatus = true;
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
        this.setState({hasWon: false, board: this.createBoard()});
    }

    render() {
        return (
            <div className='Board'>
                {this.state.hasWon ? 
                (<div className='Board-Win'>
                    <h1>YOU WON!</h1>
                    <button onClick={() => {this.restart()}} className="Board-Restart">Restart</button>
                </div>) 
                :
                (<div className='Board-Render'>
                    <h1>LIGHTS OUT!</h1>
                    <p>(PS. this is an easy version, win by having at maximum 2 lights switched on!)</p>
                    <table className='Board-Table'>
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