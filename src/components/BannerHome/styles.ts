import { styled } from "styled-components";

export const Container = styled.div`
  height: 22.9375rem;
  background-color: #D9DEA5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; 
  padding: 1rem;

  @media (min-width: 1200px){
    
    &::before {
      content: "";
      position: absolute;
      left: 0; 
      top: 50%;
      transform: translateY(-50%);
      width: 300px; 
      height: 100%; 
      background-image: url('/images/banner-detail.png');
      background-size: contain; 
      background-repeat: no-repeat;
      background-position: left center;
      z-index: 0; 
    }
  
   
    & > * {
      position: relative;
      z-index: 1;
    }

  }

  img{
    margin-bottom: 3.375rem;
  }

  h1 {
    z-index: 1; 
    color: #000000;
    font-size: 1.8rem;

     @media (min-width: 1200px){
      font-size: 2.5rem;
     }
  }
`;