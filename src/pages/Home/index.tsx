import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import api from '../../services/api';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [apiPage, setApiPage] = useState(1);
  const [apiError, setApiError] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);

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
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      loadCharacters();
    }
  };

  useEffect(() => {
    window.document.title = 'Home';
    loadCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (apiError) {
    return <p>{apiError}</p>;
  }

  return (
    <div>
      {characters.map(character => (
        <Link to={`/details/${character.id}`}>
          <div key={character.id}>
            <h1>{character.name}</h1>
            <h3>{character.status}</h3>
            <img src={character.image} alt={character.name} />
          </div>
        </Link>
      ))}
      {loading && 'Carregando...'}
    </div>
  );
};

export default Home;
