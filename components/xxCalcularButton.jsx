import React from 'react'
import Image from 'next/image'


function NextButton({ handleCalcular }) {
  return (
    <button
    onClick={handleCalcular}
    className="fixed h-14 w-14 top-4 right-4 lg:right-40  bg-blue-500 text-white py-2 px-3 rounded-md lg:w-32 flex justify-evenly items-center opacity-50 hover:opacity-100 transition-opacity duration-300"
  >
    {/* &#8594; */}
    <span className="hidden lg:block">Calcular</span>
    <Image src="/images/arrow-right.svg" alt="Logo" width={30} height={30} />
  </button>
  )
}

export default NextButton