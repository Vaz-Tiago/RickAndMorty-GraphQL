import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const Paginate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 25px 0;
`;

export const Loading = styled.div`
  width: 300px;
  height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
