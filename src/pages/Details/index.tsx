import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { gql } from '@apollo/client';

import api from '../../services/api';
import Header from '../../components/Header';
import LoadingIcon from '../../components/LoadingIcon';
import CharacterInfoCard from '../../components/CharacterInfoCard';

import { CharacterDetails } from '../../interfaces/character';
import { Container, Back } from './styles';

const Details: React.FC = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [character, setCharacter] = useState<CharacterDetails>();

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    const parsedId = Number(id);

    api
      .query({
        query: gql`
        query {
          character(id: ${parsedId}) {
            id
            name
            image
            episode {
              name
            }
          }
        }
      `,
      })
      .then(response => {
        if (!unmounted) {
          setCharacter(response.data.character);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!unmounted) {
          setApiError(err.message);
          setLoading(false);
        }
      });
    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header pageTitle={character ? character.name : 'Loading...'} />
      <Container>
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <Back>
              <Link to="/">
                <FiArrowLeft size={40} />
              </Link>
            </Back>
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
    </>
  );
};

export default Details;
