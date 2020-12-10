import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Sample Graphql App</title>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
