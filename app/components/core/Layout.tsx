import React from 'react';
import Head from 'next/head';
import { AuthChecker } from './AuthChecker';
import { Header } from '../header/Header';

interface Props {
  title?: string;
  image?: string;
  description?: string;
  hideDefaultHeader?: boolean;
  needMargin?: boolean;
}

export const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  hideDefaultHeader,
  needMargin,
  image,
}) => {
  return (
    <div>
      <Head>
        <title>{title ? title : 'Ecom'}</title>
        <link rel='icon' href={image ? image : '/favicon.ico'} />
        <meta
          name='description'
          content={description ? description : 'An E-commerce app'}
        />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:type' content='website' />
      </Head>
      {!hideDefaultHeader && <Header />}
      <div className='p-5 text-slate-900'>
        {needMargin && <div className='w-full h-24'></div>}
        <AuthChecker>{children}</AuthChecker>
      </div>
    </div>
  );
};
