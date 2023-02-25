import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@/components/Layout';
import { baseApi } from '@/services/base-api';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next.js Tailwind Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApiProvider api={baseApi}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApiProvider>
    </>
  );
}
