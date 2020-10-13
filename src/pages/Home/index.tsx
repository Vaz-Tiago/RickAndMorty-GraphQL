import React, { useEffect, useState, useCallback, useRef } from 'react';
import { gql } from '@apollo/client';

import api from '../../services/api';
import Header from '../../components/Header';
import GenericCard from '../../components/GenericCard';
import LoadingIcon from '../../components/LoadingIcon';
import ErrorMessage from '../../components/ErrorMessage';

import { Container, Loading, Content, Paginate } from './styles';
import { CharacterList } from '../../interfaces/character';
import { ApiPagination } from '../../interfaces/pagination';

// FIXME Ao carregar mais dados, vai direto para o fim da lista.
// Ver como manter a lista no local atual.

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [apiPagination, setApiPagination] = useState<ApiPagination>({
    pages: 0,
    count: 0,
    current: 1,
    next: 2,
    prev: 0,
    loaded: false,
  });
  const [apiError, setApiError] = useState('');
  const [characters, setCharacters] = useState<CharacterList[]>([]);
  const loader = useRef(null);

  const loadCharacters = useCallback(
    async (page: number) => {
      const GET_CHARACTERS = {
        query: gql`
        query {
          characters (page: ${page}){
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
        console.log(paginationInfo);

        setApiPagination({
          pages: paginationInfo.pages,
          count: paginationInfo.count,
          current: apiPagination.next
            ? apiPagination.next - 1
            : apiPagination.current + 1,
          next: paginationInfo.next ? paginationInfo.next : 0,
          prev: paginationInfo.prev ? paginationInfo.prev : 0,
          loaded: true,
        });
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [characters, apiPagination],
  );

  const handleObserver = useCallback(
    async entity => {
      const target = entity[0];

      if (target.isIntersecting) {
        loadCharacters(apiPagination.next);
      }
    },
    [apiPagination, loadCharacters],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '5px',
      treshould: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    const test = loader.current;

    if (test) {
      observer.observe(test);
    }

    loadCharacters(apiPagination.current);
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
          <Content>
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
          </Content>
        )}

        <div ref={loader} />

        {/* {apiPagination.loaded && (
          <Paginate ref={loader}>
            {apiPagination.next !== 0 ? (
              <div>
                <button
                  type="button"
                  onClick={() => loadCharacters(apiPagination.next)}
                >
                  Carregar Mais
                </button>
              </div>
            ) : (
              <p>Nada para exibir</p>
            )}
          </Paginate>
        )} */}
      </Container>
    </>
  );
};

export default Home;
