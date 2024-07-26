import { useState, useEffect } from 'react';
import axios from 'axios';
import './pokemon.css';

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const { results } = response.data;
        const pokemonDetails = await Promise.all(results.map(async (pokemon) => {
          const pokeDetails = await axios.get(pokemon.url);
          return pokeDetails.data;
        }));
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredPokemon = pokemonData.filter(pokemon => 
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <p id="head-text">Pokémon</p>
      <input 
        type="text" 
        placeholder="Search Pokémon" 
        value={search} 
        onChange={handleSearch} 
      />
      <div className="pokemon-grid">
        {filteredPokemon.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
