import React, { useEffect } from 'react';

import logo from '../../assets/logo.png';
import { Container, Logo } from './styles';

interface Header {
  pageTitle: string;
}
const Header: React.FC<Header> = ({ pageTitle }: Header) => {
  useEffect(() => {
    window.document.title = pageTitle;
  }, [pageTitle]);

  return (
    <Container>
      <Logo src={logo} alt="Rick and Morty Logo" />
    </Container>
  );
};

export default Header;
