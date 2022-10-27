import React, { Dispatch, SetStateAction, useState } from 'react'

interface IOTP {
  navigate: (string: string) => void,
  setShowModal: Dispatch<SetStateAction<boolean>>
}

function OTP({navigate, setShowModal}: IOTP) {
    const [selected, setSelected] = useState("")
    const [otpError, setOtpError] = useState("")
  
    const CONTACTS = {
        tel: "+447975777666",
        landline: "0121 496 0441",
        email: "dummymail@email.com"
    }

    const handleOTP = (e) => {
        try {
          if (e.target.form[0].value === "0000") {
            navigate("/home")
          } else {
            throw new Error("Invalid Code")
          }
        } catch (e) {
          setOtpError(e.message)
        }
      }
  
  return (
    <>
       <div className="background bg-black opacity-[0.5] w-screen h-screen fixed top-0 left-0" style={{zIndex: 999}} onClick={() => setShowModal(false)}/>
        <div 
          className="w-1/8 fixed shadow-lg rounded top-1/2 left-1/2 bg-white flex flex-col justify-center items-center p-2"
          style={{transform: "translate(-50%, -50%)", zIndex: 1000}}>
          <ul className="w-full">
            {Object.values(CONTACTS).map(
              (value, index) => <li key={index} className={`border border-grey p-2 cursor-pointer ${selected === value && "active bg-green-500 text-white"}`} onClick={() => setSelected(value)}>{value}</li>
            )}
          </ul>
          {selected && <>
            <form id="otp">
              <input type="text" placeholder="Code" alt="OTP Code Input Field" className="border border-grey p-1 m-2" />
            </form>
            <button form="otp" type="submit" className="rounded p-2 bg-green-600 border border-green-200 text-white w-full" 
              onClick={e => {
                e.preventDefault()
                handleOTP(e)
              }}
            >
              Submit
            </button>
            {otpError && <p className='text-red-500'>{otpError}</p>}
          </>}
        </div>
      </>
  )
}

export default OTP