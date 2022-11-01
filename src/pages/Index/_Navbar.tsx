import React from 'react'

function Navbar() {
  return (
    <nav className="sticky w-full flex flex-col md:flex-row items-center justify-center bg-white border-b border-grey top-0 p-1" style={{zIndex: 1000}}>
        <img className='object-contain left-0 m-1' src={require("@assets/images/pokedex-logo.png")} alt="logo" style={{maxHeight: 40}}/>
        {/* <div className="flex justify-center">
          <input className='border-grey border p-2 max-w-[500px]' placeholder="Search" type="search"/>
        </div> */}
    </nav>
  )
}

export default Navbar