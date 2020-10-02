import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate (0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  color: #d2fec0;
  svg {
    animation: ${rotate} 3s infinite;
  }
`;
