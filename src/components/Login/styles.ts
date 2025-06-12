import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    h1 {
        margin-bottom: 1.5rem;
    }

    
    .form-group{
        width: 15rem;
        margin-bottom: 1rem;
    }

    button {
         height: 2.5rem;
        width: 15rem;
        border-radius: 10px;
        background: #1D1D1D;
        color: #fff;
        border: none;
    }

    .error-message {
        color: red;
        margin-top: 2rem;
    }
`