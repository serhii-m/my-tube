import React, { useState } from 'react';
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import dynamic from 'next/dynamic';

import axios, { AxiosRequestConfig } from 'axios';

import { Body } from '../components/Body';
import { Header } from '../components/Header';

const DynamicSidebar = dynamic(() =>
  import('../components/Sidebar').then((mod) => mod.Sidebar)
);

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <main className="overflow-x-hidden">
      <div>
        <Header toggleSidebar={toggleSidebar} />
        <div className="mt-16 md:mt-20">
          <DynamicSidebar isOpen={isOpen} />
          <Body data={data} />
        </div>
      </div>
    </main>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const requestHeaders = {
    'X-RapidAPI-Key': process.env.NEXT_APP_API_KEY!,
    'X-RapidAPI-Host': process.env.NEXT_APP_API_HOST!,
  };

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const REQUEST_METHOD = 'GET';

  const generateQueryOptions = (queryString: any = {}): AxiosRequestConfig => {
    if ('channel' in queryString) {
      return {
        method: REQUEST_METHOD,
        url: 'https://youtube-search-and-download.p.rapidapi.com/channel',
        params: {
          id: query.channel,
          sort: 'n',
        },
        headers: requestHeaders,
      };
    }

    if ('query' in queryString) {
      return {
        method: REQUEST_METHOD,
        url: 'https://youtube-search-and-download.p.rapidapi.com/search',
        params: {
          query: query.query,
          hl: 'en',
          type: 'v',
        },
        headers: requestHeaders,
      };
    }

    return {
      method: REQUEST_METHOD,
      url: 'https://youtube-search-and-download.p.rapidapi.com/trending',
      params: { hl: 'en' },
      headers: requestHeaders,
    };
  };

  const getUniqueItems = (arr: any[], amount: number = 0): unknown[] =>
    Object.values(
      arr.reduce(
        (acc: object, el: any) => ({ ...acc, [el?.video?.videoId]: el }),
        {}
      )
    ).slice(0, amount);

  const response = await axios.request(generateQueryOptions(query));
  const { data } = response;

  return {
    props: {
      data: { ...data, contents: getUniqueItems(data.contents, 36) },
    },
  };
};
