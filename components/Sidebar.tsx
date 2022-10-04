import React from 'react';

import { sidebarItems } from '../data/sidebarItems';
import { TSidebarProps } from '../types';

export const Sidebar: React.FC<TSidebarProps> = ({ isOpen }) => (
  <div className={isOpen ? '' : 'hidden'}>
    <ul className="flex flex-col gap-10 bg-gray-100 dark:bg-zinc-900 z-20 fixed overflow-y-scroll h-full">
      {sidebarItems &&
        sidebarItems.map((item) => (
          <li
            className="flex items-center text-center gap-4 cursor-pointer hover:text-gray-600 p-3 md:p-2"
            key={item.id}
          >
            {item.icon}{' '}
            <span className="font-semibold pr-4 hidden lg:block">
              {item.name}
            </span>
          </li>
        ))}
    </ul>
  </div>
);
