import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;

  background: #d2fec0;
  padding: 40px;
  border-radius: 45px;
`;

export const Loading = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;

  border: 4px solid #22a2bd;
  border-radius: 45px;
`;

export const Info = styled.div`
  flex: 1;
  margin-left: 40px;
`;

export const Name = styled.h2`
  border-radius: 45px;
  background: #22a2bd;

  text-align: center;
  padding: 15px;

  color: #0a3139;
`;

export const Episodes = styled.div`
  border-radius: 45px;
  background: #22a2bd;

  padding: 25px;
  overflow: auto;
  margin-top: 5px;

  border: 6px solid #22a2bd;

  height: 235px;

  p {
    color: #0a3139;
    line-height: 22px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    margin: 40px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d2fec0;
    border-radius: 10px;
  }
`;
