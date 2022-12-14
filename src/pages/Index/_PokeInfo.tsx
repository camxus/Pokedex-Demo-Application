import { ButtonStyled } from '@src/assets/css/Button'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Plus } from "react-feather"
import { PokemonProps } from '.'

interface IPokeInfo {
  show: Boolean
  setShow: Dispatch<SetStateAction<boolean>>
  pokemon: PokemonProps
  setPokemon: Dispatch<SetStateAction<PokemonProps>>
}

function PokeInfo({show, setShow, pokemon, setPokemon}: IPokeInfo) {
  const handleClose = () => {
    setShow(false)
    setPokemon(null)
  }
  return (
        <>
          <div className={`background bg-black ${!show ? "opacity-[0] pointer-events-none" : "opacity-[0.5]"} w-screen h-screen fixed top-0 left-0`} style={{zIndex: 9999}} onClick={() => handleClose()}/>
          <div className={`sidebar-container w-full sm:min-w-[500px] sm:w-1/4 h-3/4 sm:h-full fixed sm:top-0 bottom-0 right-0 shadow-lg bg-white flex flex-col justify-center items-center p-2 ${show ? "show" : ""}`} style={{ zIndex: 10000 }}>
          {pokemon && 
            <>
              <h2 className="PokeInfo-header font-bold text-left w-full p-3 border-0 border-b mb-4">
                {pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1, pokemon?.name.length)}
              </h2>
              <div className="PokeInfo-body flex-auto overflow-scroll w-full px-4">
                <div className="w-full flex justify-evenly items-center">
                  <img className="object-cover" src={pokemon?.sprites.front_default} alt={pokemon?.name} style={{height: 64, width: 64}}/>
                  <h3 className="font-bold">{pokemon?.name[0].toUpperCase() + pokemon?.name.slice(1, pokemon?.name.length)}</h3>
                </div>
                <table className="w-full inline-table">
                  <tbody className="align-baseline">
                    <tr>
                      <th className="w-1/4">Types</th>
                      <td className="py-4">
                        {
                          pokemon?.types ? 
                          <ul>
                            {pokemon?.types?.map((t, index) => <li key={index}>{t.type.name}</li>)}
                          </ul>
                          :
                          <p className="my-4 text-slate-400">No type assigned</p>
                        }
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Height</th>
                      <td className="py-4">
                        {
                          pokemon?.height ? <p>{pokemon?.height}</p>
                          :
                          <p className="my-4 text-slate-400">No height assigned</p>
                        }
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Weight</th>
                      <td className="py-4">
                        {
                          pokemon?.weight ? <p>{pokemon?.weight}</p>
                          :
                          <p className="my-4 text-slate-400">No weight assigned</p>
                        }
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Stats</th>
                      <td className="py-4">
                        {
                          pokemon?.stats ? 
                          <table>
                            <tbody>
                              {pokemon?.stats?.map((s, index) => <tr key={index} >
                                  <th className="text-left">{s.stat.name}</th>
                                  <td className="w-full pl-4"><div className={`bg-slate-500 h-[3px] rounded px-2`} style={{width: `${s.base_stat}%`}}/></td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                          :
                          <p className="my-4 text-slate-400">No stats assigned</p>
                        }
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/4">Moves</th>
                      <td className="py-4">
                        {
                          pokemon?.moves ? 
                          <ul>
                            {pokemon?.moves?.map((m, index) => <li key={index} >{m.move.name}</li>)}
                          </ul>
                          :
                          <p className="my-4 text-slate-400">This Pok??mon has not learnt any moves</p>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          }
        </div>
    </>
  )
}

export default PokeInfo