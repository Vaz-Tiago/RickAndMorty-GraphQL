/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Info, Name, Status } from './styles';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

const GenericCard: React.FC<Character> = ({
  id,
  name,
  status,
  image,
}: Character) => {
  const [editedName, setEditedName] = useState(name);

  useEffect(() => {
    if (name.length > 30) {
      const editName = name.substr(0, 27);
      setEditedName(`${editName}...`);
    }
  }, []);

  return (
    <Link to={`/details/${id}`}>
      <Container image={image}>
        <Info>
          <Name>{editedName}</Name>
          <Status>{status}</Status>
        </Info>
      </Container>
    </Link>
  );
};

export default GenericCard;
