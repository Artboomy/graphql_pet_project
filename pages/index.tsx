import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Main from '../components/main';
import { CssBaseline } from '@material-ui/core';

const Root = (): JSX.Element => {
    const client = new ApolloClient({
        uri: 'https://graphql.anilist.co/',
        cache: new InMemoryCache()
    });
    return (
        <ApolloProvider client={client}>
            <CssBaseline />
            <Main />
        </ApolloProvider>
    );
};

export default Root;
