import React from 'react';

import { Navbar } from './Navbar';
import { VideoPlayer } from './VideoPlayer';

import { TComponentProps } from '../types';

export const Body: React.FC<TComponentProps> = ({ data }) => (
  <div className="mx-4 lg:ml-20">
    <Navbar />
    <VideoPlayer data={data} />
  </div>
);
