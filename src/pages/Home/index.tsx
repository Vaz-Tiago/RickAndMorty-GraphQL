import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FiLoader } from 'react-icons/fi';
import { gql } from '@apollo/client';

import api from '../../services/api';
import Header from '../../components/Header';
import GenericCard from '../../components/GenericCard';

import { Container, Loading } from './styles';
import { CharacterList } from '../../interfaces/character';

const Home: React.FC = () => {
  const unmounted = useRef(false);
  const [loading, setLoading] = useState(true);
  const [apiPage, setApiPage] = useState(1);
  const [apiError, setApiError] = useState('');
  const [characters, setCharacters] = useState<CharacterList[]>([]);

  const loadCharacters = useCallback(async () => {
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
    if (!unmounted.current) {
      setLoading(true);
    }

    try {
      const response = await api.query(GET_CHARACTERS);
      const charactersResponse = response.data.characters.results;
      const charactersList = characters.concat(charactersResponse);
      if (!unmounted.current) {
        setCharacters(charactersList);
        setApiPage(apiPage + 1);
        setLoading(false);
      }
    } catch (err) {
      if (!unmounted.current) {
        setApiError(err.message);
        setLoading(false);
      }
    }
  }, [apiPage, characters]);

  useEffect(() => {
    setLoading(true);
    loadCharacters();
    return () => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.onscroll = () => {
    if (apiError) return;
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      loadCharacters();
    }
  };

  if (apiError && apiError !== '404: Not Found') {
    return <p>{apiError}</p>;
  }

  return (
    <>
      <Header pageTitle="Home" />
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

        {loading && (
          <Loading>
            <FiLoader size={40} />
          </Loading>
        )}
        {apiError && apiError === '404: Not Found' && 'Nothing to Show'}
      </Container>
    </>
  );
};

export default Home;
