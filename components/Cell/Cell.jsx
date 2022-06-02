import React from 'react'
import styled from 'styled-components'

const BorderedBox = styled.div`
width: 75px;
height: 75px;
border: 1px solid lightblue;
background-color: ${ props => props.alive ? "white" : "black" };
margin: 2px;

&:hover {
    background: grey;
    cursor: pointer;
}
`

export default function Cell( { alive } ) {
    return <BorderedBox alive={alive}></BorderedBox>
}