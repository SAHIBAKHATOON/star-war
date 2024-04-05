//  import React, { useState } from 'react'
//  import './App.css'
//  const App = () => {
//  const [color, setColor] = useState("olive")
//    return (
  
//         <div style={{backgroundColor: color}} className='app'>
//        <div>
//         <button style={{backgroundColor: 'red'}}
//         onClick={() => setColor('red')}
//         >red</button>
//         <button style={{backgroundColor: 'green'}}
//         onClick={() => setColor('green')}
//         >green</button>
//        </div>
//      </div>
//    )
//  }
 
//  export default App


import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import './App.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCharacter, setModalCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError('Failed to fetch characters. Please try again later.');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const openModal = (character) => {
    setModalCharacter(character);
  };

  const closeModal = () => {
    setModalCharacter(null);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="app">
      <h1>Star Wars Characters</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="character-grid">
        {characters.map((character, index) => (
          <div key={index} onClick={() => openModal(character)}>
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
      {modalCharacter && <CharacterModal character={modalCharacter} onClose={closeModal} />}
    </div>
  );
};

export default App;
