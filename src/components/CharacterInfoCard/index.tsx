import React from 'react';
import { CharacterDetails } from '../../interfaces/character';

import { Container, Content, Image, Info, Name, Episodes } from './styles';

const CharacterInfoCard: React.FC<CharacterDetails> = ({
  image,
  name,
  episode,
}: CharacterDetails) => (
  <Container>
    <Content>
      <Image src={image} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Episodes>
          <ul>
            {episode.map(({ name: episodeName }) => (
              <li key={episodeName}>{episodeName}</li>
            ))}
          </ul>
        </Episodes>
      </Info>
    </Content>
  </Container>
);
export default CharacterInfoCard;
