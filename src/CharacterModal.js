import React, { useState, useEffect } from 'react';

const CharacterModal = ({ character, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      const response = await fetch(character.homeworld);
      const data = await response.json();
      setHomeworld(data);
    };

    fetchHomeworld();
  }, [character.homeworld]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{character.name}</h2>
        <p>Height: {character.height} m</p>
        <p>Mass: {character.mass} kg</p>
        <p>Date Added: {new Date(character.created).toLocaleDateString('en-GB')}</p>
        <p>Films: {character.films.length}</p>
        <p>Birth Year: {character.birth_year}</p>
        {homeworld && (
          <div>
            <h3>Homeworld</h3>
            <p>Name: {homeworld.name}</p>
            <p>Terrain: {homeworld.terrain}</p>
            <p>Climate: {homeworld.climate}</p>
            <p>Residents: {homeworld.residents.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterModal;
