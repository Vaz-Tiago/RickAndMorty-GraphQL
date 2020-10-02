import React from 'react';
import { FiLoader } from 'react-icons/fi';
import { Container } from './styles';

const LoadingIcon: React.FC = () => (
  <Container>
    <FiLoader size={40} />
  </Container>
);

export default LoadingIcon;
