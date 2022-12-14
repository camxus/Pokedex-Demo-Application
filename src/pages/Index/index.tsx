import { useFormik } from 'formik'
import React, { useEffect, useReducer, useState } from 'react'
import { useAsyncError, useNavigate } from "react-router-dom"
import { Plus } from "react-feather"
import * as yup from 'yup'
import { getAllPokemon, getPokemon } from '@src/pokedex/api/pokemon'
import Navbar from './_Navbar'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ButtonStyled } from '@src/assets/css/Button'
import Modal from './Modal'
import PokemonRow from './_PokemonRow'
import PokeInfo from './_PokeInfo'

export interface PokemonProps {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
  types?: {
    type: {
      name: string
    }
  }[]
  moves?: {
    move: {
      name: string
    }
  }[]
  stats?: {
    base_stat: number
    stat: { 
      name: string
    }
  }[]
}

interface IPokemonReducer {
  loading: Boolean,
  next: string,
  pokemon: PokemonProps[],
  offset: number,
  limit: number
}


const Index = () => {

  // const navigate = useNavigate()
  const [blur, setBlur] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPokeInfo, setShowPokeInfo] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonProps>(null)
  const [myPokemon, setMyPokemon] = useState<PokemonProps[]>(JSON.parse(localStorage.getItem("myPokemon") ?? "[]"))

  // for this I usually use middleware such as redux async thunk
  const [pokemonReducerState, setPokemonReducerState]: [IPokemonReducer, React.Dispatch<React.SetStateAction<IPokemonReducer>>] = useState({
    loading: false,
    next: "",
    pokemon: [],
    offset: 0,
    limit: 20
  })

  // appends fetched Pokemon pokemon array
  const orderedFetch = async (results) => {
    return await Promise.all(results.map(async p => {
      const pokemon = await getPokemon({url: p.url})
      if (!pokemonReducerState.pokemon.find(pokemon => pokemon.name === p.name)) {
        return pokemon
      }
      return
    }))
  }
  
  const appendPokemon = (pokemon, pokemonReducerState) => {
    if (pokemon) return {
      ...pokemonReducerState,
      pokemon: [...pokemonReducerState.pokemon, pokemon]
    }
  }

  // fetches pokemon uses offset and limit queries
  const fetchPokemon = async () => {
    if (pokemonReducerState.loading) return
    setPokemonReducerState(pokemonReducerState => ({...pokemonReducerState, loading: true}))

    const {results, next} = await getAllPokemon({offset: pokemonReducerState.offset})
    const pokemon = await orderedFetch(results)

    pokemon.forEach(p => {
      setPokemonReducerState(pokemonReducerState => appendPokemon(p, pokemonReducerState))
    })
    
    setPokemonReducerState(pokemonReducerState => ({
      ...pokemonReducerState,
      offset: pokemonReducerState.pokemon.length,
      loading: false,
      next
    }))
  }

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon)
    setShowPokeInfo(true)
  }

  // on mount fetch pokemon
  useEffect(() => {
    fetchPokemon()
  }, [])

  // i had time
  useEffect(() => {
    setBlur(showModal || showPokeInfo)
  }, [showModal, showPokeInfo])

  useEffect(() => {
    const page = document.querySelector(".index")
    if (blur) {
      page.classList.add("blur-lg")
      return
    } else {
      console.log("remove")
      page.classList.remove("blur-lg")
    }
  }, [blur])
  
  return (
    <>
      <div className="index">
        <Navbar/>
        <div className="w-full h-full flex justify-center relative">
          <InfiniteScroll className="contents" next={fetchPokemon} hasMore={(pokemonReducerState.next !== undefined) || (pokemonReducerState.next !== null)} loader={<></>} dataLength={pokemonReducerState.pokemon.length}>
            <div className="pokemon-list w-full px-[5vw] max-w-[500px]">
              <h3 className="font-bold my-4">MyCustom Pok??mon</h3>
              {
                myPokemon.length > 0 ?
                  <table className="inline-table w-full"> 
                    {myPokemon.map((pokemon, index) => (
                      <tbody key={index}>
                        <PokemonRow custom {...{pokemon, index, onClick: handleSelectPokemon, selectedPokemon}}/>
                      </tbody>
                    ))
                    }
                  </table>
                :
                <>
                  <p className="my-4 text-slate-400">You have not added any custom Pok??mon</p>
                  <ButtonStyled className="relative py-1 px-4 w-full hover:rounded-[0px]" type="submit" onClick={() => setShowModal(true)}>Add Pok??mon</ButtonStyled>
                </>
              }
              <hr className="w-full border-0 border-b"/>
              <h3 className="font-bold my-4">All Pok??mon</h3>
              {
                pokemonReducerState.pokemon.length > 0 ?
                  <table className="inline-table w-full">
                    {pokemonReducerState.pokemon.map((pokemon, index) => (
                      <tbody key={index}>
                        <PokemonRow {...{pokemon, index, onClick: handleSelectPokemon, selectedPokemon}}/>
                      </tbody>
                      ))}
                  </table>
                :
                  <p className="my-4 text-slate-400">No Pok??mon found</p>
              }
            </div>
          </InfiniteScroll>
        </div>
      </div>
      {
        <>
        <ButtonStyled onClick={() => setShowModal(true)} className="fixed bottom-4 right-4 p-4 hover:rounded-[0px]">
          <Plus color='white'/>
        </ButtonStyled>
          {showModal && (
            <Modal {...{setShowModal, setMyPokemon}}/>
          )}
        </>
      }
      {
        <PokeInfo {...{show: showPokeInfo, setShow: setShowPokeInfo, pokemon: selectedPokemon, setPokemon: setSelectedPokemon}}/>
      }
    </>
  )
}

export default Index