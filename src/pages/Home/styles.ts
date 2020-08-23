import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const rotate = keyframes`
  from {
    transform: rotate (0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const Loading = styled.div`
  width: 300px;
  height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    animation: ${rotate} 3s infinite;
  }
`;
