import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    h2{
        margin: 1.5rem 0;

    }

    p {
        font-weight: bold;
        text-align: center;
        margin-bottom: 2.875rem;
    }

    a {
        background: #1D1D1D;
        color: #fff;
        height: 2.5rem;
        width: 18.125rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }
`