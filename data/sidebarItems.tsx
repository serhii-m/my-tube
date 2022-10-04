import React from 'react';
import {
  BsHouse,
  BsCompass,
  BsController,
  BsFilm,
  BsClockHistory,
  BsCollectionPlay,
  BsHandThumbsUp,
  BsGear,
} from 'react-icons/bs';

export const sidebarItems: { id: number, name: string; icon: React.ReactNode }[] = [
  {
    id: 0,
    name: 'Home',
    icon: <BsHouse size={25} />,
  },
  {
    id: 1,
    name: 'Explore',
    icon: <BsCompass size={25} />,
  },
  {
    id: 2,
    name: 'Subscriptions',
    icon: <BsCollectionPlay size={25} />,
  },
  {
    id: 3,
    name: 'Gaming',
    icon: <BsController size={25} />,
  },
  {
    id: 4,
    name: 'Films',
    icon: <BsFilm size={25} />,
  },
  {
    id: 5,
    name: 'History',
    icon: <BsClockHistory size={25} />,
  },
  {
    id: 6,
    name: 'Likes',
    icon: <BsHandThumbsUp size={25} />,
  },
  {
    id: 7,
    name: 'Settings',
    icon: <BsGear size={25} />,
  },
];
