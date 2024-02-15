import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Find from '../../../find/Find.js'
import React, { useState } from 'react';


export const KbarInput = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onClick = () => {
    toggleModal()
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="w-10 lg:w-36 h-10 border-[1px] bg-transparent rounded-lg font-medium border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300  hover:bg-slate-200 dark:hover:bg-slate-800"
      >
        <div className="items-center justify-between hidden px-3 lg:flex">
          Search...
        </div>
        <div className="flex justify-center w-10 h-10 p-2 lg:hidden">
          <MagnifyingGlassIcon />
        </div>
      </button>
      <Find isModalOpen={isModalOpen} toggleModal={toggleModal}/>
    </div>
  );
};
