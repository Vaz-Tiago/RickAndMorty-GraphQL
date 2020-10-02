import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Title } from './styles';

interface ErrorProps {
  title?: string;
  message: string;
}
const ErrorMessage: React.FC<ErrorProps> = ({ title, message }: ErrorProps) => (
  <Container>
    <Title>
      <FiAlertCircle size={30} />
      {title && <h4>{title}</h4>}
    </Title>
    <p>{message}</p>
  </Container>
);

export default ErrorMessage;
