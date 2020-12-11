import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CssBaseline } from '@material-ui/core';
import * as React from 'react';

interface IProps {
    children: JSX.Element;
}
const Wrapper = (props: IProps): JSX.Element => {
    const client = new ApolloClient({
        uri: 'https://graphql.anilist.co/',
        cache: new InMemoryCache()
    });
    return (
        <ApolloProvider client={client}>
            <CssBaseline />
            {props.children}
        </ApolloProvider>
    );
};
export default Wrapper;
