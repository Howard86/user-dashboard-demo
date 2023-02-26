import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@/components/Layout';
import Notification from '@/components/Notification';
import { baseApi } from '@/services/base-api';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>User Dashboard demo</title>
        <meta
          name="description"
          content="This is a demo website showing how to manage users info with external api"
        />
      </Head>
      <ApiProvider api={baseApi}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApiProvider>
      <Notification />
    </>
  );
}
