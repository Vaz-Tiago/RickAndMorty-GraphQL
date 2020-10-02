import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #0B3038;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    font-family: 'Rambla', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4,h5,h6 {
    font-weight: 700;
    font-family: 'Rambla', sans-serif;
  }

  p {
    font-weight: 500;
    font-family: 'Rambla', sans-serif;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

`;
