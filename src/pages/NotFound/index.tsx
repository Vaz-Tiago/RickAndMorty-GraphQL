import React from 'react';
import { Link } from 'react-router-dom';

import notFound from '../../assets/404.png';
import Header from '../../components/Header';

import { Container } from './styles';

const NotFound: React.FC = () => (
  <>
    <Header pageTitle="Page Not Found" />
    <Container>
      <Link to="/">
        <img src={notFound} alt="Page not found" />
      </Link>
    </Container>
  </>
);

export default NotFound;
