import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import api from '../../services/api';

interface CharacterDetail {
  id: number;
  name: string;
  image: string;
  episode: Episode[];
}

interface Episode {
  name: string;
}

const Details: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const loadCharacter = useCallback(async (characterId: number) => {
    setLoading(true);
    const GET_CHARACTER = {
      query: gql`
        query {
          character(id: ${characterId}) {
            id
            name
            image
            episode {
              name
            }
          }
        }
      `,
    };
    try {
      const response = await api.query(GET_CHARACTER);
      setCharacter(response.data.character);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.document.title = character ? character.name : 'Loading...';

    loadCharacter(id);
  }, [character, loadCharacter, id]);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/">Voltar</Link>
          {apiError && <h3>{apiError}</h3>}
          {character && (
            <div>
              <h1>{character.name}</h1>
              <img src={character.image} alt={character.name} />
              {character.episode.map(episode => (
                <p key={episode.name}>{episode.name}</p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Details;
