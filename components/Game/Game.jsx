import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Board from '../Board/Board'
import { flatToGrid, getNeighboursForCell } from '../../utils/helpers'

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1 0 100%;
    width: 100%;
`
const Spacing = styled.div`
    width: 50px
`
const Button = styled.button`
  background: ${props => props.primary ? "darkgreen" : "white"};
  color: ${props => props.primary ? "white" : "darkgreen"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkgreen;
  border-radius: 3px;

  &:hover {
      background: ${props => props.primary ? "white" : "darkgreen"};
  color: ${props => props.primary ? "darkgreen" : "white"};
  cursor: pointer;
  }
`;

export default function Game() {

    let [boards, setBoards] = useState([])
    let [currentBoardIndex, setCurrentBoardIndex] = useState(0)
    
    function createNewBoard(cellsList, width, height) {
        width = width || 500
        height = height || 500
        if(!Array.isArray(cellsList)) throw "Cell List should be an array."
        if(cellsList.length == 0) throw "Cell List cannot be empty."
        if (Array.isArray(cellsList[0])) {
            if (cellsList.length != cellsList[0].length) throw "Cell list row and col not of equal length. Cell list should be a single dimetional array whose length is a perfect square, or a two dimensional array with equal number of row and columns."
            setBoards(
                [
                    {
                        width,
                        height,
                        cellData: cellsList
                    }
                ]
            )
        } else { 
            let squareSize = Math.floor(Math.sqrt(cellsList.length))
            if (Math.pow(squareSize, 2) != cellsList.length ) throw "Cell list length is not a perfect square. Cell list should be a single dimetional array whose length is a perfect square, or a two dimensional array with equal number of row and columns"
            let newBoard = flatToGrid(cellsList)
            setBoards(
                [
                    {
                        width,
                        height,
                        cellData: newBoard
                    }
                ]
            )
        }
        
    }

    useEffect(()=>{ 
        createNewBoard([
                    {
                        alive: true,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: true,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: true,
                    },
                    {
                        alive: true,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: true,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: false,
                    },
                    {
                        alive: false,
                    },
                ]
            )
    }, [])

    function nextTick() {
        if(currentBoardIndex + 1 == boards.length){
            const currentBoard = boards[currentBoardIndex]
            const boardSize = Math.floor(Math.sqrt(currentBoard.cellData.length))
            const newBoard = []
            for(let rowIdx=0; rowIdx<currentBoard.cellData.length; rowIdx++){
                for(let colIdx=0; colIdx<currentBoard.cellData[rowIdx].length; colIdx++){
                    let myself = currentBoard.cellData[rowIdx][colIdx]
                    let neighbours = getNeighboursForCell(currentBoard.cellData, rowIdx, colIdx)
                    console.log(neighbours);
                    let aliveNeighbours = neighbours.reduce((prev, cur)=> cur.alive ? prev + 1 : prev, 0)
                    if(myself.alive){
                        newBoard.push( (aliveNeighbours == 2 || aliveNeighbours == 3) ? {
                            alive: true
                        } : {
                            alive: false
                        })
                    } else {
                        newBoard.push((aliveNeighbours == 3) ? {
                            alive: true
                        } : {
                            alive: false
                        })
                    }
                }
            }
            setBoards([...boards, { width: 500, height: 500, cellData: flatToGrid(newBoard)}])
        }
        setCurrentBoardIndex(currentBoardIndex + 1)
    }

    function previousTick() {
        if(currentBoardIndex > 0){
            setCurrentBoardIndex(currentBoardIndex - 1)
        }
    }
    
    return (
        boards.length > currentBoardIndex && currentBoardIndex >= 0
            ?
            (
                <>
                    <Row>
                        <Board {...boards[currentBoardIndex]} />
                    </Row>
                    <Row>
                        <Button onClick={previousTick}> {"<"} Prev</Button>
                        <Spacing />
                        <Button onClick={nextTick}> {">"} Next</Button>
                    </Row>
                </>
            )
            :
            (
                <div> <h1>No boards set ? </h1><h2>Try a reset using <Button>Reset</Button></h2></div>

            )

    )
}