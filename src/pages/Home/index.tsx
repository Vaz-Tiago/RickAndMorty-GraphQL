import React, { useEffect, useCallback, useState } from 'react';
import { gql } from '@apollo/client';
import api from '../../services/api';

import GenericCard from '../../components/GenericCard';
import logo from '../../assets/logo.png';

import { Container } from './styles';
import { CharacterList } from '../../interfaces/character';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [apiPage, setApiPage] = useState(1);
  const [apiError, setApiError] = useState('');
  const [characters, setCharacters] = useState<CharacterList[]>([]);

  const loadCharacters = useCallback(async () => {
    setLoading(true);
    const GET_CHARACTERS = {
      query: gql`
        query {
          characters (page: ${apiPage}){
            results {
              id
              name
              status
              image
            }
          }
        }
      `,
    };

    try {
      const response = await api.query(GET_CHARACTERS);
      const charactersResponse = response.data.characters.results;
      const charactersList = characters.concat(charactersResponse);
      setCharacters(charactersList);
      setApiPage(apiPage + 1);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiPage, characters]);

  window.onscroll = () => {
    if (apiError) return;
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      loadCharacters();
    }
  };

  useEffect(() => {
    window.document.title = 'Home';
    loadCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (apiError && apiError !== '404: Not Found') {
    return <p>{apiError}</p>;
  }

  return (
    <>
      <img src={logo} alt="Rick and Morty Characters" />
      <Container>
        {characters.map(character => (
          <GenericCard
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            image={character.image}
          />
        ))}
        {loading && 'Carregando...'}
        {apiError && apiError === '404: Not Found' && 'Nothing to Show'}
      </Container>
    </>
  );
};

export default Home;
