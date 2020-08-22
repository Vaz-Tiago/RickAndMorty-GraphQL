/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Info, Name, Status } from './styles';
import { CharacterList } from '../../interfaces/character';

const GenericCard: React.FC<CharacterList> = ({
  id,
  name,
  status,
  image,
}: CharacterList) => {
  const [editedName, setEditedName] = useState(name);

  useEffect(() => {
    if (name.length > 30) {
      const editName = name.substr(0, 27);
      setEditedName(`${editName}...`);
    }
  }, [name]);

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
