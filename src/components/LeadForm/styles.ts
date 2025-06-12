import styled from "styled-components";

export const Container = styled.section`

    @media (min-width: 1200px){
       width: 30.3125rem;
       margin-inline: auto;
    }

`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const IntroText = styled.div`
    margin-top: 2.4375rem;
    margin-bottom: 3.0625rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    

    h2, p {
        font-weight: bold;
        text-align: center;
    }

    h2{
        margin: 1.3125rem 0;
    }
`

export const FieldForm = styled.div`
    width: 90%;
    margin-bottom: 0.625rem;

    @media (min-width: 1200px){
         width: 18.75rem;
    }
`

export const VisaSection = styled.div`
    margin-top: 2.0625rem;

    .visaTitle{
        text-align: center;
    }

`

export const CheckboxVisa = styled.div`
    margin-top: 1.5625rem;
`

export const SectionHelp = styled.div`
    margin-top: 1.8125rem;
    text-align: center;

    label{
        display: block;
        font-weight: bold;
        margin-bottom: 1.4375rem;
    }

    textarea{
        border: 1px solid #b6b6b6;
        color: #b6b6b6;
        padding-left: 0.75rem;
        height: 10.5rem;
        width: 14.8125rem;
    }
`

export const InputFileContainer = styled.div`
    input {
        display: none;
    }

    label {
        display: flex;
        align-items: center;
        height: 2.25rem;
        padding-inline: 1.5rem;
        background-color: #fff;
        border: 1px solid #b6b6b6;
        color: #b6b6b6;
        border-radius: 10px;
        cursor: pointer;
        font-size: 1rem;
        
    }
`

export const ButtonSubmit = styled.button`
    background: #1D1D1D;
    color: #fff;
    height: 2.5rem;
    width: 18.875rem;
    border-radius: 10px;
    margin: 2.375rem 0;
    border: none;
`