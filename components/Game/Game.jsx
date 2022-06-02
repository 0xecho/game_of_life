import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Board from '../Board/Board'
import { getNeighboursForCell } from '../../utils/helpers'

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

    useEffect(()=>{ 
        setBoards([
            {
                width: 500,
                height: 500,
                cellData: [
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
                ]
            }

        ])
    }, [])

    function nextTick() {
        if(currentBoardIndex + 1 == boards.length){
            const currentBoard = boards[currentBoardIndex]
            const boardSize = Math.floor(Math.sqrt(currentBoard.cellData.length))
            const newBoard = []
            for(let cellNumber=0; cellNumber<currentBoard.cellData.length; cellNumber++){
                let colIdx = Math.floor(cellNumber / boardSize)
                let rowIdx = cellNumber % boardSize
                let myself = currentBoard.cellData[cellNumber]
                let neighbours = getNeighboursForCell(currentBoard.cellData, rowIdx, colIdx)
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
            setBoards([...boards, {width: 500, height:500, cellData: newBoard}])
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