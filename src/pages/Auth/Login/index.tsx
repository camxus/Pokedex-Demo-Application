import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';
import {ReactComponent as Logo} from "@assets/images/drdoctor-company-logo.svg"
import OTP from './OTP/index.tsx';

const Login = () => {

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true)

  const formik = useFormik({
    initialValues: {
      last_name: "",
      birthdate: "",
      postcode: ""
    },
    validateOnChange: true,
    validationSchema: yup.object().shape({
      last_name: yup.string()
        .required("Name Required")
        .max(50, 'Maximun Name Length 50 Characters'),

      postcode: yup.string()
        .required("Postcode Required")
        .matches(/^[a-zA-Z0-9 ]{5,7}$/, 
        'Postcode must be between 5-7 Characters'),
      birthdate: yup.date()
        .required("Date of Birth Required")
    }),

    onSubmit: values => {
      const _values = {
        last_name: values.last_name,
        birthdate: values.birthdate,
        postcode: values.postcode
      }
      setShowModal(true)
    }
  })
  
  
  return (
    <>
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col w-1/2 max-width-[500px] p-2 items-center">
        <Logo/>
        <div className="md:flex w-full p-2">
          <form className='w-full flex flex-col p-2' id="login">
            <input className='border border-grey p-1' type="text" id="last_name" alt="Last Name Input Feild" placeholder="Last Name" onChange={formik.handleChange}/>
            <input className='border border-grey p-1' type="date" id="birthdate" alt="Birthdate Input Feild" placeholder="Date of Birth" onChange={formik.handleChange}/>
            <input className='border border-grey p-1' type="text" id="postcode" alt="Postcode Input Feild" placeholder="Postcode" onChange={formik.handleChange}/>
          </form>
          <div className="md:border-l border-grey w-full">
            <ul className="h-full flex flex-col justify-center p-3">
              {formik.errors && Object.entries(formik.errors).map(
                ([key, error]) => formik.touched[key] && <li><label htmlFor={key} className="text-red-500 cursor-pointer">{error}</label></li>
              )}
            </ul>
          </div>
        </div>
        <button form="login" type="submit" className="rounded p-2 bg-green-600 border border-green-200 text-white w-full" 
        onClick={e => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        >
          Submit
        </button>
      </div>
    </div>
    {
      showModal && <OTP {...{navigate, setShowModal}}/>
    }
    </>
  )
}

export default Login