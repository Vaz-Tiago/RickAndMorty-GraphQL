import styled from 'styled-components';

interface ContainerProps {
  image: string;
}

export const Container = styled.div<ContainerProps>`
  width: 300px;
  height: 300px;

  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  border-radius: 45px;
  background: url(${props => props.image}) no-repeat center;
  border: 5px solid #22a2bd;

  transition: box-shadow 0.3s;

  :hover {
    box-shadow: 0 0 15px 5px #7dfa48;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 45px;
  background: #22a2bd;
  height: 55px;
`;

export const Name = styled.h4`
  padding: 10px;
  color: #0a3139;
`;

export const Status = styled.p`
  color: #0a3139;
`;
