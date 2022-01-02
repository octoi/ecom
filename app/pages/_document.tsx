// Don't ask me anything about this, I've no idea what is going on.
// OFC I copied it
// Copied from https://github.com/vercel/next.js/blob/canary/examples/with-styletron/pages/_document.js

import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Provider as StyletronProvider } from 'styletron-react';
import { Server, Client, Sheet } from 'styletron-engine-atomic';

const getHydrateClass = () =>
  document.getElementsByClassName(
    '_styletron_hydrate_'
  ) as HTMLCollectionOf<HTMLStyleElement>;

const styletron =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: getHydrateClass(),
      });

export default class MyDocument extends Document<{ stylesheets: Sheet[] }> {
  static getInitialProps(props: any) {
    // eslint-disable-next-line react/display-name
    const page = props.renderPage((App: any) => (props: any) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className='_styletron_hydrate_'
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
