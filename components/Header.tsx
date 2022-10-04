import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import {
  BsSearch,
  BsCameraVideo,
  BsBell,
  BsMicFill,
  BsList,
  BsPlayCircleFill,
} from 'react-icons/bs';
import Avatar from 'react-avatar';

import RenderThemeToggle from './RenderThemeToggle';

import { THeaderProps } from '../types';

const DynamicSearchForm = dynamic(() =>
  import('./SearchForm').then((mod) => mod.SearchForm)
);

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

export const Header: React.FC<THeaderProps> = ({ toggleSidebar }) => {
  const [inputValue, setInputValue] = useState('');
  const [notification, setNotification] = useState(2);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setNotification(Math.floor(Math.random() * 10));
    setMounted(true);
  }, []);

  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/?query=${inputValue.toLowerCase()}`);
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center justify-between border-b-2 fixed top-0 left-0 w-screen z-20 bg-white dark:bg-zinc-900 py-2">
      <button
        type="button"
        aria-label="burger menu"
        className="rounded-full cursor-pointer ml-2 md:ml-6 hover:bg-gray-200 dark:hover:bg-zinc-700 p-2"
        onClick={() => {
          toggleSidebar();
        }}
      >
        <BsList className="w-6 h-6" />
      </button>
      <div className="flex items-center justify-center relative ml-1 pt-1 mr-2 cursor-pointer">
        <BsPlayCircleFill className="text-4xl text-fuchsia-700 cursor-pointer pr-1" />
        <Link href="/">
          <h2 className="text-xl sm:text-2xl text-black-600 font-bold tracking-tighter">
            MyTube
          </h2>
        </Link>
        <span className="hidden sm:absolute -right-5 -top-0.5 pl-4 opacity-50 text-[15px] uppercase">
          ua
        </span>
      </div>
      <div className="hidden sm:flex items-center justify-center focus:outline-none focus:bg-gray-300">
        <div className="flex items-center justify-center bg-gray-200 rounded-lg mr-2 my-2">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-200 rounded-lg px-4 py-2 text-gray-800 md:w-[20em] focus:outline-none lg:w-[35em]"
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
            className="mr-3 dark:text-gray-900 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <BsMicFill className="text-2xl mr-3 hidden md:block" />
      </div>
      <BsSearch
        className="mr-3 w-7 h-7 cursor-pointer sm:hidden"
        onClick={() => setVisible(true)}
      />
      {visible && (
        <DynamicSearchForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          setVisible={setVisible}
          handleSearch={handleSearch}
        />
      )}
      {mounted && <RenderThemeToggle />}
      <div className="flex items-center justify-between">
        <BsCameraVideo
          className="hidden md:block text-3xl mr-7"
          data-tip="Add a new Video"
        />
        <div className="relative hidden sm:block mr-3 md:mr-7 ">
          <BsBell className="text-2xl md:text-3xl" data-tip="Notifications" />
          <span className="absolute -top-3 -right-1 w-4 h-4 text-center flex items-center justify-center rounded-full bg-red-600 p-3 text-[12px] text-white ">
            {notification}
          </span>
        </div>
        <div className="mr-5 md:mr-7 font-bold" data-tip="Your account">
          <Avatar name="John Doe" size="35" round />
        </div>
      </div>
      {mounted && <ReactTooltip backgroundColor="#403e3f" isCapture />}
    </div>
  );
};
