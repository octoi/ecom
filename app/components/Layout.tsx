import React from 'react';
import Head from 'next/head';
import { AuthShield } from './AuthSheild';

interface Props {
  children: React.ReactNode;
  title?: string;
  image?: string;
  description?: string;
}

export const Layout: React.FC<Props> = (props) => {
  const layoutData = {
    title: props.title || 'Ecom',
    image: props.image || '/favicon.svg',
    description: props.description || 'Sell & Buy Products With Ecom',
  };

  return (
    <div>
      <Head>
        <title>{layoutData.title}</title>
        <link rel='icon' href={layoutData.image} />
        <meta name='description' content={layoutData.description} />
        <meta property='og:title' content={layoutData.title} />
        <meta property='og:description' content={layoutData.description} />
        <meta property='og:image' content={layoutData.image} />
        <meta property='og:type' content='website' />
      </Head>
      <AuthShield>{props.children}</AuthShield>
    </div>
  );
};
