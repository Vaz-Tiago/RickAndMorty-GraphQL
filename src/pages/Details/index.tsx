import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import api from '../../services/api';

import { CharacterDetails } from '../../interfaces/character';
import CharacterInfoCard from '../../components/CharacterInfoCard';

import { Container } from './styles';

const Details: React.FC = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [character, setCharacter] = useState<CharacterDetails | null>(null);

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

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/">Voltar</Link>
          {apiError && <h3>{apiError}</h3>}
          {character && (
            <CharacterInfoCard
              episode={character.episode}
              id={character.id}
              image={character.image}
              name={character.name}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Details;
