import React from 'react'
import styled from 'styled-components'

import Cell from '../Cell/Cell'

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1 0 100%;
    width: 100%;
`

export default function Board( { width, height, cellData } ) {


    return (
        cellData.map((row, idx) => {
            return <Row key={idx}>
                {
                    row.map((cell, idx) => {
                        return <Cell {...cell} key={idx}/>
                    })
                }
            </Row>
        })
    )
}