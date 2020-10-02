import React, { useEffect, useState, useCallback } from 'react';
import { gql } from '@apollo/client';

import api from '../../services/api';
import Header from '../../components/Header';
import GenericCard from '../../components/GenericCard';
import LoadingIcon from '../../components/LoadingIcon';
import ErrorMessage from '../../components/ErrorMessage';
import Paginate from '../../components/Paginate';

import { Container, Loading } from './styles';
import { CharacterList } from '../../interfaces/character';
import { Pagination } from '../../interfaces/pagination';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [apiPage, setApiPage] = useState(1);
  const [apiPagination, setApiPagination] = useState<Pagination>({
    pages: 0,
    count: 0,
    current: 1,
    next: 0,
    prev: null,
    loading: true,
  });
  const [apiError, setApiError] = useState('');
  const [characters, setCharacters] = useState<CharacterList[]>([]);

  const loadCharacters = useCallback(async () => {
    const GET_CHARACTERS = {
      query: gql`
        query {
          characters (page: ${apiPagination.current}){
            results {
              id
              name
              status
              image
            },
            info{
              count,
              pages,
              next,
              prev
            }
          }
        }
      `,
    };
    setLoading(true);
    try {
      const response = await api.query(GET_CHARACTERS);
      const charactersResponse = response.data.characters.results;
      const charactersList = characters.concat(charactersResponse);
      setCharacters(charactersList);
      // Pagination
      const paginationInfo = response.data.characters.info;
      setApiPagination({
        pages: paginationInfo.pages,
        count: paginationInfo.count,
        current: apiPagination.current,
        next: paginationInfo.next,
        prev: paginationInfo.prev,
        loading: false,
      });
      setApiPage(apiPage + 1);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  }, [apiPage, characters, apiPagination]);

  useEffect(() => {
    setLoading(true);
    loadCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header pageTitle="Home" />
      <Container>
        {apiError && apiError !== '404: Not Found' ? (
          <ErrorMessage
            title="Something Wrong"
            message="We are working to fix this problem, try again later."
          />
        ) : (
          <>
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
                <LoadingIcon />
              </Loading>
            )}
            {apiError && apiError === '404: Not Found' && 'Nothing to Show'}
          </>
        )}
      </Container>
      <Paginate />
    </>
  );
};

export default Home;
