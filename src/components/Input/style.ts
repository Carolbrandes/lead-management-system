import styled from "styled-components";

interface InputProps {
  isError: boolean
}

export const Input = styled.input<InputProps>`
    width: 100%;
    height: 2.25rem;
    border-radius: 10px;
    border: ${props => props.isError ? '1px solid red' : '1px solid #b6b6b6'};
    color: ${props => props.isError ? 'red' : '#b6b6b6'};
    padding-left: 0.75rem;

    &::placeholder {
    color: #b6b6b6;
  }
`