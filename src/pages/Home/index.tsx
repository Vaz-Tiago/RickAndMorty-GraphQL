import React, { useEffect } from 'react';
import { gql } from '@apollo/client';
import api from '../../services/api';

const Home: React.FC = () => {
  useEffect(() => {
    window.document.title = 'Home';
    api
      .query({
        query: gql`
          query {
            characters {
              results {
                name
              }
            }
          }
        `,
      })
      .then(response => console.log(response));
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <p>Listagem de personagens</p>
    </div>
  );
};

export default Home;
