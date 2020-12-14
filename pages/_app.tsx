import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { useApollo } from '../apollo/client';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@material-ui/core';

/**
 * @see https://github.com/vercel/next.js/blob/8340e6d34562ad575293b5699023144fc47831d2/examples/api-routes-apollo-server-and-client/pages/_app.js
 * @param Component
 * @param pageProps
 * @constructor
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const client = useApollo(pageProps.initialApolloState);
    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Sample Graphql App</title>
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
            </Head>
            <CssBaseline />
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
