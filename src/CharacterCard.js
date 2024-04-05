import React, { useState, useEffect } from 'react';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
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
    <div className="card" style={{ backgroundColor: getRandomColor() }}>
      <img src={`https://picsum.photos/200?random=${character.name}`} alt={character.name} />
      <h3>{character.name}</h3>
      <p>Species: {character.species.length > 0 ? character.species[0] : 'Unknown'}</p>
      {homeworld && (
        <p>Homeworld: {homeworld.name}</p>
      )}
    </div>
  );
};

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export default CharacterCard;
