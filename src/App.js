import React, { useState } from "react";
import "./App.css";

const pokemons = {
  "Trindade da Criação (Creation Trio)": [
    { name: "Dialga", id: 483, alternateId: 10245, type: "Trio da criação" },
    { name: "Palkia", id: 484, alternateId: 10246, type: "Trio da criação" },
    { name: "Giratina", id: 487, alternateId: 10007, type: "Trio da criação" },
  ],
  "Tao Trio": [
    { name: "Zekrom", id: 644, type: "Tao Trio" },
    { name: "Reshiram", id: 643, type: "Tao Trio" },
    { name: "Kyurem", id: 646, type: "Tao Trio" }
  ],
  "Trio do Clima (Weather Trio)": [
    { name: "Groudon", id: 383, alternateId: 10078, type: "Guardião" },
    { name: "Kyogre", id: 382, alternateId: 10077, type: "Guardião" },
    { name: "Rayquaza", id: 384, alternateId: 10079, type: "Guardião" },
  ],
  "Trio das avez lendarioas": [
    { name: "Articuno", id: 144, alternateId: 10169, type: "Aves Lendárias" },
    { name: "Zapdos", id: 145, alternateId: 10170, type: "Aves Lendárias" },
    { name: "Moltres", id: 146, alternateId: 10171, type: "Aves Lendárias" }
  ],
  "Trio do Infinito": [
    { name: "Xerneas", id: 716, type: "Vida e Morte" },
    { name: "Yveltal", id: 717, type: "Vida e Morte" }
  ],
  "O Criador (Alpha Pokémon)": [
    { name: "Arceus", id: 493, isCenter: true, type: "Criador" },
  ],
  "Pokémons Míticos": [
    { name: "Mew", id: 151, type: "Mítico" },
    { name: "Mewtwo", id: 150, alternateId: 10043, type: "Mítico" },
  ]
};

const groupByType = (data) => {
  return Object.values(data).flat().reduce((acc, pokemon) => {
    const type = pokemon.type || "Outros";
    if (!acc[type]) acc[type] = [];
    acc[type].push(pokemon);
    return acc;
  }, {});
};

function App() {
  const [pokemonForms, setPokemonForms] = useState(() => {
    const initialForms = {};
    Object.values(pokemons).forEach(group => {
      group.forEach(pokemon => {
        initialForms[pokemon.id] = "normal";
      });
    });
    return initialForms;
  });

  const handleClick = (id, alternateId, isKyurem = false) => {
    setPokemonForms((prev) => {
      const currentForm = prev[id];

      if (isKyurem) {
        if (currentForm === "normal") {
          return { ...prev, [id]: "shiny" };
        } else if (currentForm === "shiny") {
          return { ...prev, [id]: "fusion" };
        } else {
          return { ...prev, [id]: "normal" };
        }
      }

      return {
        ...prev,
        [id]:
          currentForm === "normal"
            ? "alternate"
            : currentForm === "alternate"
            ? "shiny"
            : "normal",
      };
    });
  };

  const grouped = groupByType(pokemons);

  return (
    <div className="App">
      <header>
        <h1 className="title">Pokémons</h1>
      </header>

      <div className="types-container">
        {Object.entries(grouped).map(([type, pokemons]) => (
          <div key={type} className="type-box">
            <h2 className="type-title">{type}</h2>
            <div className="pokemons-group">
              {pokemons.map((pokemon) => {
                const form = pokemonForms[pokemon.id];
                const normalImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
                const shinyImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`;
                const alternateImageUrl = pokemon.alternateId
                  ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.alternateId}.png`
                  : normalImageUrl;

                let imageUrl = normalImageUrl;
                if (form === "alternate") {
                  imageUrl = alternateImageUrl;
                } else if (form === "shiny") {
                  imageUrl = shinyImageUrl;
                } else if (form === "fusion" && pokemon.name === "Kyurem") {
                  imageUrl = Math.random() > 0.5
                    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10022.png" // Black Kyurem
                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10023.png"; // White Kyurem
                }

                return (
                  <div key={pokemon.name} className={`pokemon-card ${pokemon.isCenter ? "center" : ""}`}>
                    <img
                      src={imageUrl}
                      alt={pokemon.name}
                      onMouseEnter={(e) => (e.target.src = shinyImageUrl)}
                      onMouseLeave={(e) => (e.target.src = imageUrl)}
                      onClick={() =>
                        handleClick(
                          pokemon.id,
                          pokemon.alternateId,
                          pokemon.name === "Kyurem"
                        )
                      }
                    />
                    <p>{pokemon.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p className="footer-text">Feito com 💙 por um fã de Pokémon</p>
      </footer>
    </div>
  );
}

export default App;
