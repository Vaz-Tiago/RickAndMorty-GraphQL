import React, { useEffect, useCallback, useState } from 'react';
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
  const [apiError, setApiError] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);

  const loadCharacters = useCallback(async () => {
    const GET_CHARACTERS = {
      query: gql`
        query {
          characters {
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
      setCharacters(response.data.characters.results);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.document.title = 'Home';
    loadCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (apiError) {
    return <p>{apiError}</p>;
  }

  return (
    <div>
      {characters.map(character => (
        <div key={character.id}>
          <h1>{character.name}</h1>
          <h3>{character.status}</h3>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
    </div>
  );
};

export default Home;
