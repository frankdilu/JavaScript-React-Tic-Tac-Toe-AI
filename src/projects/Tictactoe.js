import React from "react"
import "../styles/projects/Tictactoe.css"

let totalBoardsRevised = 0

export default class TicTacToe extends React.Component{
    state = {
        finished:false,
        winner:""
    }


    toggleCell = (e)=>{
        if(this.playerTurn(this.state.actualBoard) === "X" && !this.terminal(this.state.actualBoard)){
            if(e.target.innerHTML === ""){
                e.target.innerHTML = "X"
    
                let tmp = this.state.actualBoard
                tmp[e.target.id[3]][e.target.id[5]] = "X"
                this.setState({actualBoard:tmp})
    
                let move = this.minimax(this.state.actualBoard)
    
                if(move !== null){
        
                    let tmp2 = this.state.cells
                    tmp2[move[0]][move[1]].innerHTML = "O"
                    this.setState({cells:tmp2})
                    
                    let tmp3 = this.state.actualBoard
                    tmp3[move[0]][move[1]] = "O"
                    this.setState({actualBoard:tmp3})
                }
                if (this.terminal(this.state.actualBoard)){
                    let winner = this.winner(this.state.actualBoard)
                    if (winner !== null){
                        this.setState({winner:"The winner is " + winner + ". "})
                    } else {
                        this.setState({winner:"Nobody wins. "})
                    }
                    this.setState({finished:true})
                }
            }
        }
    }

    restart = ()=>{
        alert("Fun fact:\n Total boards revised in the last game: " + totalBoardsRevised) 
        totalBoardsRevised = 0
        this.setState({actualBoard:[[null,null,null],[null,null,null],[null,null,null]]})
        let cells = this.state.cells
        cells.map(r=>r.map(c=>c.innerHTML = ""))
        this.setState({cells:cells})
        this.setState({finished:false})
        this.setState({winner:""})
    }

    activeCells = (board)=>{
        let active = 0
        board.map(r=>r.map(c=>{
            if(c !== null){
                active++
            }
            return true
        }))
        return active
    }

    playerTurn = (board)=>{
        if(this.activeCells(board) % 2 === 0) return "X"
        return "O"
    }

    possiblesMoves = (board)=>{
        let boardCopy = [[...board[0]],[...board[1]],[...board[2]]]
        let possiblesMoves = []
        for (let i = 0; i < boardCopy.length; i++){
            for (let j = 0; j < boardCopy[i].length; j++){
                if ( boardCopy[i][j] === null ){
                    possiblesMoves.push([i,j])
                }
            }
        }
        return possiblesMoves
    }

    resultBoard = (board, action)=>{
        let boardCopy = [[...board[0]],[...board[1]],[...board[2]]]
        if (boardCopy[action[0]][action[1]] !== null){
            throw new Error("Impossible move")
        } else {
            boardCopy[action[0]][action[1]] = this.playerTurn(board)
        }
        return boardCopy
    }

    winner = (board)=>{
        //  Horizontal
        if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][2] != null){
            return board[0][0]
        }
        if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][2] != null){
            return board[1][0]
        }
        if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][2] != null){
            return board[2][0]
        }
        
        // # Vertical
        if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[2][0] != null){
            return board[0][0]
        }
        if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[2][1] != null){
            return board[0][1]
        }
        if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[2][2] != null){
            return board[0][2]
        }

        // # Diagonal
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] != null){
            return board[0][0]
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] != null){
            return board[0][2]
        }
        
        return null
    }

    terminal = (board)=>{
        if (this.activeCells(board) === 9){
            return true
        } else if (this.winner(board) != null){
            return true
        } else { 
            return false
        }
    }

    utility = (board)=>{
        if (this.winner(board) === "X"){
            return 1
        } else if (this.winner(board) === "O"){
            return -1
        } else {
            return 0
        }
    }

    optimalMove = (board, wantedResult)=>{
        let possibleMoves = []
        let returnValue = null
        this.possiblesMoves(board).map(action=>{
            if(returnValue === null){
                let resultBoard = this.resultBoard(board, action)
                totalBoardsRevised++
                if (this.terminal(resultBoard)){
                    returnValue = [action, this.utility(resultBoard)]
                } else {
                    let x = this.optimalMove(resultBoard, -wantedResult)
                    possibleMoves.push([action,x[1]])
                }
            }
        })
        if (returnValue != null){
            return returnValue
        }
        
        if (wantedResult === 1){
            let possiblesMovesKeys = []
            possibleMoves.map(m=>possiblesMovesKeys.push(m[1]))
            let max = Math.max(...possiblesMovesKeys)
            let bestMove = possibleMoves.find(n=>n[1] === max)
            return bestMove
        } else {
            let possiblesMovesKeys = []
            possibleMoves.map(m=>possiblesMovesKeys.push(m[1]))
            let max = Math.min(...possiblesMovesKeys)
            let bestMove = possibleMoves.find(n=>n[1] === max)
            return bestMove
        }
    }

    minimax = (board)=>{
        if(this.terminal(board)){
            return null
        }

        let move = this.optimalMove(board, -1)

        return move[0]
    }

    componentDidMount(){
        let cells = [
            [0,1,2].map(n=>document.getElementById("ttt0-"+n)),
            [0,1,2].map(n=>document.getElementById("ttt1-"+n)),
            [0,1,2].map(n=>document.getElementById("ttt2-"+n)),
        ]
        cells.map(r=>r.map(c=> c.addEventListener("click",this.toggleCell)))
        this.setState({cells:cells})
        this.setState({actualBoard:[[null,null,null],[null,null,null],[null,null,null]]})
    }
    render(){
        return(
        <div className="gameContainer">
            {
                this.state.finished ?
                    <button className="tttRestart" onClick={this.restart}>{this.state.winner}restart</button>
                :
                null
            }
            <div className="tttContainer">
                <div id="ttt0-0" className="tttCell"></div>
                <div id="ttt0-1" className="tttCell"></div>
                <div id="ttt0-2" className="tttCell"></div>
                <div id="ttt1-0" className="tttCell"></div>
                <div id="ttt1-1" className="tttCell"></div>
                <div id="ttt1-2" className="tttCell"></div>
                <div id="ttt2-0" className="tttCell"></div>
                <div id="ttt2-1" className="tttCell"></div>
                <div id="ttt2-2" className="tttCell"></div>
            </div>
        </div>
        )
    }
}