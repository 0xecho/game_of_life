import React from 'react'
import styled from 'styled-components'

import Game from './components/Game/Game.jsx'

const ContainerDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function App () {
    return (
        <ContainerDiv>
            <Game></Game>
        </ContainerDiv>
    )
}