import React from 'react';
import { useRouter } from 'next/router';

import { genres } from '../data/genres';

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex overflow-x-scroll scrollbar-hide xl:justify-evenly items-center gap-6 w-screen border-b-2 p-4">
      {genres &&
        genres.map((item) => (
          <button
            key={item}
            type="button"
            className="border rounded-2xl
            dark:border-zinc-600
            bg-grey-100
            px-2 py-1
            cursor-pointer
            last:mr-24
            hover:bg-gray-200
            dark:hover:bg-gray-700
            active:bg-gray-900
            active:text-white"
            onClick={() => {
              router.push(`/?query=${item.toLowerCase()}`);
            }}
          >
            {item}
          </button>
        ))}
    </div>
  );
};
