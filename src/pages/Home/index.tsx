import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    window.document.title = 'Home';
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <p>Listagem de personagens</p>
    </div>
  );
};

export default Home;
