import React from 'react'
import Image from 'next/image';

function NextButton({ handleNext, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={handleNext}
      className={disabled 
        ? "fixed right-4 top-4 h-14 w-14 md:right-40 md:bottom-40 bg-gray-500 text-black py-2 px-3 rounded-md md:w-32 flex justify-evenly items-center opacity-30" 
        : "fixed right-4 top-4 h-14 w-14 md:right-40 md:bottom-40 bg-blue-500 text-white py-2 px-3 rounded-md md:w-32 flex justify-evenly items-center opacity-50 hover:opacity-100 transition-opacity duration-300" }
    >
      {/* &#8594; */}
      <span className="hidden md:block">Next</span>
      <Image src="/images/arrow-right.svg" alt="Logo" width={30} height={30} />
    </button>
  )
}

export default NextButton