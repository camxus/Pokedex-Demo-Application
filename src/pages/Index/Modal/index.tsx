import { ButtonStyled } from '@src/assets/css/Button'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Plus } from "react-feather"
import { PokemonProps } from '..'

interface IModal {
  setShowModal: Dispatch<SetStateAction<boolean>>
  setMyPokemon: Dispatch<SetStateAction<Array<PokemonProps>>>
}

// Returns b64 string representation of file
export const fileToDataUri = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
      resolve(reader.result)
  }
})

function Modal({setShowModal, setMyPokemon}: IModal) {
  const [image, setImage] = useState(null)

    const handleUpload = async (image) => {
        setImage(await fileToDataUri(image))
    }


  const handleSubmit = (e) => {
    e.preventDefault()
    setMyPokemon(myPokemon => {
      const _myPokemon = [
        ...myPokemon,
        {
          id: myPokemon.length + 1,
          sprites: {front_default: image},
          name: e.target.name.value
        }
      ]
      localStorage.setItem("myPokemon", JSON.stringify(_myPokemon))
      return _myPokemon
  })
  setShowModal(false)
  }

  return (
    <>
      <div className="background bg-black opacity-[0.5] w-screen h-screen fixed top-0 left-0" style={{zIndex: 9999}} onClick={() => setShowModal(false)}/>
      <div className="w-1/8 fixed shadow-lg rounded top-1/2 left-1/2 bg-white flex flex-col justify-center items-center p-2" style={{ transform: "translate(-50%, -50%)", zIndex: 10000}}>
        <div className="modal-header font-bold text-left w-full p-3 border-0 border-b mb-4">
          Add Pokémon
        </div>
        <div className="modal-body">
          <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
            <div className="relative group border-[3px] border-black flex justify-center items-center cursor-pointer overflow-hidden hover:bg-black rounded-[0px] hover:rounded-[100px]" style={{height: 64, width: 64}}>
              <input id="image" className="absolute w-full h-full opacity-0 cursor-pointer" type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])}/>
              {image ? <img src={image} alt={"Your Pokemon"}/> : <Plus className='cursor-pointer group-hover:stroke-white'/>}
            </div>
            <input id="name" type="text" className="m-1 p-4 border-0 border-b focus:rounded-none focus:outline-transparent focus:border-black" placeholder="Name"/>
            <ButtonStyled className="relative py-1 px-4 ml-auto" type="submit">Add</ButtonStyled>
          </form>
        </div>

      </div>
    </>
  )
}

export default Modal