import React, { FC } from "react";
import { Link } from "react-router-dom";
import { GiCurlyWing } from 'react-icons/gi'

const Welcome: FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center flex-col">
      <GiCurlyWing size={55} fill='white' />
      <h1 className="text-white text-center text-3xl font-semibold">Polycode</h1>
      <p className="italic text-white text-sm font-medium mt-2">The one and only text editor that you will ever need !!! Wanna dive in?</p>
      <Link to={'/welcome'} className='text-gray-900 text-xl mt-3 font-semibold bg-white rounded-3xl p-3 hover:rounded-xl transition-all ease-linear duration-75'>Get Started</Link>
    </div>
  )
}

export default Welcome
