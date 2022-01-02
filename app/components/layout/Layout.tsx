import React from 'react';
import Head from 'next/head';
import { Header } from '../header/Header';

interface Props {
  title?: string;
  image?: string;
  description?: string;
}

export const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  image,
}) => {
  return (
    <div>
      <Head>
        <title>{title ? title : 'Ecom'}</title>
        <link rel='icon' href={image ? image : '/favicon.png'} />
        <meta
          name='description'
          content={
            description ? description : 'Lets sell & buy some random stuffs.'
          }
        />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:type' content='website' />
      </Head>
      <Header />
      {children}
    </div>
  );
};
