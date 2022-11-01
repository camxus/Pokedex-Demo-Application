import styled from "@emotion/styled"

export const ButtonStyled = styled.button(`
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background-color: black;
    cursor: pointer;
    border: 5px solid black;
    color: white;
    &:hover {
        background-color: white;
        color: black
    }
    &:hover>svg {
        stroke: black
    }
`) 