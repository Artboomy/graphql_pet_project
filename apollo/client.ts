import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';

/**
 * From https://github.com/vercel/next.js/blob/8340e6d34562ad575293b5699023144fc47831d2/examples/api-routes-apollo-server-and-client/apollo/client.js
 */

let apolloClient: ApolloClient<Record<string, unknown>> | undefined;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        uri: 'https://graphql.anilist.co/',
        cache: new InMemoryCache()
    });
}

export function initializeApollo(
    initialState: Record<string, unknown> | null = null
): ApolloClient<Record<string, unknown>> {
    const _apolloClient = apolloClient ?? createApolloClient();
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    // Create the Apollo Client once in the client
    if (typeof window !== 'undefined' && !apolloClient) {
        apolloClient = _apolloClient;
    }

    return _apolloClient;
}

export function useApollo(
    initialState: Record<string, unknown>
): ApolloClient<Record<string, unknown>> {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}
