import React from 'react';
import Image from 'next/image';

function BackButton({ handlePrevious }) {
  return (
    <button
      onClick={handlePrevious}
      className="fixed top-4 left-4 h-14 w-14 md:left-40 md:bottom-40 bg-blue-500 text-white py-2 px-3 rounded-md mr-2 md:w-32 flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300"
    >
      {/* &#8592;  */}
      <Image src="/images/arrow-left.svg" alt="Back" width={30} height={30} />
      <span className="hidden md:block">Back</span>
    </button>
  );
}

export default BackButton;
