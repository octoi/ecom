import React from 'react';
import Head from 'next/head';
import { AppShell } from '@mantine/core';
import { AuthShield } from './AuthShield';
import { Header } from './header';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

export const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  image,
}) => {
  title = title || 'Ecom';
  description = description || 'Sell & Buy Products With Ecom';
  image = image || '/favicon.svg';

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel='icon' href={image} />
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:type' content='website' />
      </Head>

      <AppShell padding='md' header={<Header />}>
        <AuthShield>{children}</AuthShield>
      </AppShell>
    </>
  );
};
