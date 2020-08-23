import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  padding: 50px;

  border-radius: 10px;
  background: #f7b2b2;
  margin: 0 25px;

  color: #ba3838;

  font-size: 20px;
  p {
    margin-top: 20px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h4 {
    margin-left: 10px;
  }
`;
