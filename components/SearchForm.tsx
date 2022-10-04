import React from 'react';
import { BsArrowLeft, BsSearch } from 'react-icons/bs';

import { TSearchFormProps } from '../types';

export const SearchForm: React.FC<TSearchFormProps> = ({
  inputValue,
  setInputValue,
  setVisible,
  handleSearch,
}) => (
  <div className="absolute top-0 left-0 w-screen h-full flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 px-2">
    <BsArrowLeft
      className="w-6 h-6 cursor-pointer"
      onClick={() => setVisible(false)}
    />
    <input
      type="text"
      placeholder="Search"
      className="bg-gray-200 w-3/4 rounded-lg px-4 py-2 text-gray-800 focus:outline-none"
      required
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
    />
    <BsSearch
      className="mr-3 w-6 h-6 dark:text-gray-200 cursor-pointer"
      onClick={handleSearch}
    />
  </div>
);
