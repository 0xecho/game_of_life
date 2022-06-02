import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Board from '../Board/Board'

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

    return (
        boards.length > currentBoardIndex && currentBoardIndex >= 0
            ?
            (
                <>
                    <Row>
                        <Board {...boards[currentBoardIndex]} />
                    </Row>
                    <Row>
                        <Button> {"<"} Prev</Button>
                        <Spacing />
                        <Button> {">"} Next</Button>
                    </Row>
                </>
            )
            :
            (
                <div> <h1>No boards set ? </h1><h2>Try a reset using <Button>Reset</Button></h2></div>

            )

    )
}