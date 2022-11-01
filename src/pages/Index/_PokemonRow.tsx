import React from 'react'
import { PokemonProps } from '.'

interface IPokemonRow {
  pokemon: PokemonProps
  index?: number
  custom?: boolean
  onClick?: (pokemon: PokemonProps) => any
  selectedPokemon?: PokemonProps
}

function PokemonRow({pokemon, index, custom = false, onClick, selectedPokemon}: IPokemonRow) {
  const matches = (pokemon.name === selectedPokemon?.name && pokemon.id === selectedPokemon?.id)
  return (
    <tr id={pokemon.id.toString()} className={`p-2 bg-white hover:bg-slate-100 ${matches ? "bg-black text-white" : ""} ${onClick ? "cursor-pointer" : ""}`} onClick={() => onClick(pokemon)}>
      <td className="pokemon-item" style={{width: 64}}>
        <img className='object-cover' src={pokemon.sprites.front_default} alt={pokemon.name} style={{height: 64, width: 64}}/>
      </td>
      <td className="pokemon-item p-2 min-w-[3rem] w-[100px]">
        <strong>{pokemon.id}</strong>
      </td>
      <td className="pokemon-item">
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1, pokemon.name.length)}
      </td>
    </tr>
  )
}

export default PokemonRow