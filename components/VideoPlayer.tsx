import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { TComponentProps } from '../types';

const DynamicThumbnail = dynamic(() =>
  import('./Thumbnail ').then((mod) => mod.Thumbnail)
);

export const VideoPlayer: React.FC<TComponentProps> = ({ data }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      {'channel' in router.query && data?.avatar?.thumbnails && (
        <div className="flex mt-4 p-3 dark:bg-gray-800">
          <Image
            className="rounded-full"
            src={`${data?.avatar?.thumbnails[0]?.url}`}
            alt="Channel image"
            width={80}
            height={80}
          />
          <div className="ml-6">
            <p className="text-2xl">{data?.title}</p>
            <p>{data?.subscriberCountText}</p>
          </div>
        </div>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        {data.contents &&
          data.contents.map((item: any) => (
            <DynamicThumbnail
              key={item?.video?.videoId}
              item={item}
              loading={loading}
            />
          ))}
      </div>
    </>
  );
};
