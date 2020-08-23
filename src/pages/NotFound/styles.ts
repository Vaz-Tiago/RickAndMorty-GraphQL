import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    img {
      width: 100%;
      padding: 25px;
    }
  }
`;
