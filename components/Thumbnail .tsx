import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import ReactPlayer from 'react-player/lazy';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { BsDot, BsPlayCircleFill } from 'react-icons/bs';

import { TThumbnailProps } from '../types';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

export const Thumbnail: React.FC<TThumbnailProps> = ({ item, loading }) => {
  const [playing, setPlaying] = useState(false);

  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/?channel=${item?.video?.channelId}`);
  };

  return (
    <div key={item?.video?.videoId}>
      <div className="relative pt-[56.25%]">
        {loading ? (
          <Skeleton height={190} width={340} />
        ) : (
          <>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                item ? item?.video?.videoId : 'gEPmA3USJdI'
              }`}
              className="absolute left-0 top-0"
              width="100%"
              height="100%"
              pip
              controls
              light
              onPlay={() => setPlaying(true)}
            />
            {!playing && (
              <span className="absolute bottom-2 right-3 bg-slate-800 rounded text-sm text-white p-0.5">
                {item?.video?.lengthText}
              </span>
            )}
          </>
        )}
      </div>
      <div className="flex items-start mt-4 ml-1">
        {!('channel' in router.query) && (
          <button type="button">
            <BsPlayCircleFill
              aria-label="go to the channel"
              className="min-w-fit text-4xl text-fuchsia-700 cursor-pointer"
              data-tip={`${item?.video?.channelName}`}
              onClick={handleOnClick}
            />
          </button>
        )}
        <div className="pl-3">
          <h2 className="font-bold">
            {item ? `${item?.video?.title.slice(0, 45)}...` : <Skeleton />}
          </h2>

          <div className="opacity-60 font-semibold text-sm">
            {loading ? <Skeleton /> : item?.video?.channelName}
          </div>
          <div className="flex opacity-60 font-semibold text-sm">
            <p className="flex items-center justify-center text-center">
              {loading ? <Skeleton /> : item?.video?.viewCountText}{' '}
              {loading ? <Skeleton /> : <BsDot />}
            </p>
            <p>{loading ? <Skeleton /> : item?.video?.publishedTimeText}</p>
          </div>
        </div>
      </div>
      {!('channel' in router.query) && (
        <ReactTooltip backgroundColor="#403e3f" />
      )}
    </div>
  );
};
